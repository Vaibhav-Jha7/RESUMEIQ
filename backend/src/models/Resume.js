const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String, // name stored on disk / cloud key
      required: true,
    },
    fileUrl: {
      type: String, // local path or Cloudinary/S3 URL
      required: true,
    },
    fileType: {
      type: String, // pdf | docx
      required: true,
    },
    parsedText: {
      type: String, // raw extracted text, used as AI input
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
