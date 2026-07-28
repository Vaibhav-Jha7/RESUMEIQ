const multer = require("multer");

// Files are held in memory as buffers, then streamed straight to Cloudinary
// in the controller. Nothing touches local disk, so this works on hosts with
// ephemeral/read-only filesystems (Render, Railway, Vercel functions, etc.)
const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  cb(new Error("Only PDF and DOCX files are allowed"));
};

const maxSizeMb = Number(process.env.MAX_FILE_SIZE_MB) || 5;

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSizeMb * 1024 * 1024 },
});

module.exports = upload;
