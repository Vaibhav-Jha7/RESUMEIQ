const express = require("express");
const {
  runAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
  compareAnalyses,
} = require("../controllers/analysisController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect); // every analysis route requires a logged-in user

router.post("/compare", compareAnalyses);
router.post("/:resumeId", runAnalysis);
router.get("/", getAnalyses);
router.get("/:id", getAnalysisById);
router.delete("/:id", deleteAnalysis);

module.exports = router;
