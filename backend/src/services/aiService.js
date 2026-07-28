const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * Builds the instruction prompt sent to the AI. Keeping this in one place
 * makes it easy to tune scoring behavior without touching controller code.
 */
const buildPrompt = (resumeText, jobDescription) => {
  const base = `You are an expert technical recruiter, ATS (Applicant Tracking System) specialist,
and professional resume writer. Analyze the resume below and return ONLY a valid JSON object —
no markdown, no commentary, no code fences.

Resume text:
"""${resumeText}"""
`;

  const jdBlock = jobDescription
    ? `
Job description to match against:
"""${jobDescription}"""

Also compute a matchScore (0-100) representing how well this resume fits the job description,
plus matchedKeywords and missingKeywords arrays comparing resume content to the job description.

For jdTailoringTips: give 4-6 specific, actionable suggestions for tailoring THIS resume to THIS
job description — e.g. which existing experience to foreground, which missing keywords to work in
and where, what to reorder or cut. Do not give generic resume advice here; every tip must reference
something specific from either the resume or the job description.
`
    : `
No job description was provided, so set matchScore to null, matchedKeywords/missingKeywords to
empty arrays, and jdTailoringTips to an empty array.
`;

  const schema = `
Respond with exactly this JSON shape:
{
  "atsScore": number,               // 0-100, overall ATS-friendliness and quality
  "matchScore": number | null,      // 0-100, or null if no job description given
  "matchedKeywords": string[],
  "missingKeywords": string[],
  "strengths": string[],            // 3-5 short bullet points
  "weaknesses": string[],           // 3-5 short bullet points
  "sectionFeedback": {
    "summary": string,
    "experience": string,
    "skills": string,
    "education": string
  },
  "improvementSuggestions": string[],  // 5-8 concrete, actionable suggestions to improve the
                                        // resume overall (formatting, structure, quantification,
                                        // action verbs, clarity, length, etc). Each one should be
                                        // specific enough to act on immediately, not generic advice.
  "suggestedBullets": [                 // 3-5 rewritten bullet points from the resume's weakest
                                         // or vaguest lines, turned into stronger, quantified,
                                         // achievement-oriented bullets. Pick real lines from the
                                         // resume text above, don't invent unrelated ones.
    {
      "section": string,               // which resume section this bullet is from
      "original": string,              // the original line from the resume, verbatim
      "improved": string                // a rewritten, stronger version of that line
    }
  ],
  "jdTailoringTips": string[]          // see instructions above; empty array if no JD given
}`;

  return `${base}${jdBlock}${schema}`;
};

/**
 * Calls the Gemini API and returns the parsed analysis object.
 * Throws if the API call fails or the model doesn't return valid JSON.
 */
const analyzeResume = async (resumeText, jobDescription = "") => {
  const prompt = buildPrompt(resumeText, jobDescription);
  const model = process.env.AI_MODEL || "gemini-3.1-flash-lite";
  const url = `${GEMINI_URL}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 2500,
        responseMimeType: "application/json", // asks Gemini to return raw JSON
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI provider error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error("AI response did not contain any text output");
  }

  // Strip accidental code fences before parsing, in case the model adds them
  const cleaned = textOutput.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Failed to parse AI response as JSON");
  }

  return { parsed, raw: data };
};

module.exports = { analyzeResume };
