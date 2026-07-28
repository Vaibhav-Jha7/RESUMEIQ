const asyncHandler = require("../utils/asyncHandler");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const { analyzeResume } = require("../services/aiService");

// @route POST /api/analysis/:resumeId
// @body  { jobDescription?: string }
const runAnalysis = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;
  const { jobDescription = "" } = req.body;

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    res.status(404);
    throw new Error("Resume not found");
  }

  const { parsed, raw } = await analyzeResume(resume.parsedText, jobDescription);

  const analysis = await Analysis.create({
    user: req.user._id,
    resume: resume._id,
    jobDescription,
    atsScore: parsed.atsScore,
    matchScore: parsed.matchScore,
    matchedKeywords: parsed.matchedKeywords || [],
    missingKeywords: parsed.missingKeywords || [],
    strengths: parsed.strengths || [],
    weaknesses: parsed.weaknesses || [],
    sectionFeedback: parsed.sectionFeedback || {},
    improvementSuggestions: parsed.improvementSuggestions || [],
    suggestedBullets: parsed.suggestedBullets || [],
    jdTailoringTips: parsed.jdTailoringTips || [],
    rawAiResponse: raw,
  });

  res.status(201).json({ success: true, analysis });
});

// @route GET /api/analysis  (history for the logged-in user)
const getAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ user: req.user._id })
    .populate("resume", "originalName fileType createdAt")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: analyses.length, analyses });
});

// @route GET /api/analysis/:id
const getAnalysisById = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id }).populate(
    "resume",
    "originalName fileType"
  );

  if (!analysis) {
    res.status(404);
    throw new Error("Analysis not found");
  }

  res.json({ success: true, analysis });
});

// @route DELETE /api/analysis/:id
const deleteAnalysis = asyncHandler(async (req, res) => {
  const analysis = await Analysis.findOne({ _id: req.params.id, user: req.user._id });

  if (!analysis) {
    res.status(404);
    throw new Error("Analysis not found");
  }

  await analysis.deleteOne();
  res.json({ success: true, message: "Analysis deleted" });
});

// @route POST /api/analysis/compare
// @body  { analysisIds: string[] }  -- returns side-by-side scores for the dashboard
const compareAnalyses = asyncHandler(async (req, res) => {
  const { analysisIds } = req.body;

  if (!Array.isArray(analysisIds) || analysisIds.length < 2) {
    res.status(400);
    throw new Error("Provide at least two analysisIds to compare");
  }

  const analyses = await Analysis.find({
    _id: { $in: analysisIds },
    user: req.user._id,
  }).populate("resume", "originalName");

  res.json({ success: true, analyses });
});

module.exports = {
  runAnalysis,
  getAnalyses,
  getAnalysisById,
  deleteAnalysis,
  compareAnalyses,
};
