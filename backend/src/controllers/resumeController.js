const asyncHandler = require("../utils/asyncHandler");
const Resume = require("../models/Resume");
const { extractText } = require("../services/parserService");
const { uploadBuffer, deleteFile } = require("../services/storageService");

// @route POST /api/resumes/upload  (multipart/form-data, field name: "resume")
const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded. Attach a file under the 'resume' field");
  }

  const { buffer, originalname, mimetype } = req.file;

  // Parse first — if the file is unreadable, we avoid an unnecessary Cloudinary upload
  const parsedText = await extractText(buffer, mimetype);

  const { url, publicId } = await uploadBuffer(buffer, originalname);

  const resume = await Resume.create({
    user: req.user._id,
    originalName: originalname,
    fileName: publicId, // Cloudinary public_id, used later to delete the file
    fileUrl: url, // Cloudinary secure URL
    fileType: mimetype.includes("pdf") ? "pdf" : "docx",
    parsedText,
  });

  res.status(201).json({ success: true, resume });
});

// @route GET /api/resumes
const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id })
    .select("-parsedText") // list view doesn't need the full text
    .sort({ createdAt: -1 });

  res.json({ success: true, count: resumes.length, resumes });
});

// @route GET /api/resumes/:id
const getResumeById = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  res.json({ success: true, resume });
});

// @route DELETE /api/resumes/:id
const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });

  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  await deleteFile(resume.fileName); // fileName stores the Cloudinary public_id
  await resume.deleteOne();

  res.json({ success: true, message: "Resume deleted" });
});

module.exports = { uploadResume, getResumes, getResumeById, deleteResume };
