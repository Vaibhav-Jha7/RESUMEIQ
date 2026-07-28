const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    jobDescription: {
      type: String, // optional, present when user pastes a JD to match against
      default: "",
    },
    atsScore: {
      type: Number, // 0-100
      required: true,
    },
    matchScore: {
      type: Number, // 0-100, only meaningful when jobDescription is set
      default: null,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    sectionFeedback: {
      type: mongoose.Schema.Types.Mixed, // { summary: "...", experience: "...", skills: "..." }
      default: {},
    },
    improvementSuggestions: {
      type: [String], // general, actionable "do this to improve" suggestions
      default: [],
    },
    suggestedBullets: {
      // rewritten resume bullet points: original wording vs. a stronger rewrite
      type: [
        {
          section: String, // e.g. "Experience", "Projects"
          original: String,
          improved: String,
          _id: false,
        },
      ],
      default: [],
    },
    jdTailoringTips: {
      type: [String], // only populated when a jobDescription was provided
      default: [],
    },
    rawAiResponse: {
      type: mongoose.Schema.Types.Mixed, // full parsed JSON from the AI, kept for debugging/audit
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
