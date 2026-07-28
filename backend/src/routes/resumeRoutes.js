const express = require("express");
const {
  uploadResume,
  getResumes,
  getResumeById,
  deleteResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.use(protect); // every resume route requires a logged-in user

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.delete("/:id", deleteResume);

module.exports = router;
