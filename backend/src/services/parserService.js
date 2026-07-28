const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

/**
 * Extracts plain text from an uploaded resume file buffer.
 * @param {Buffer} buffer - the file buffer from multer's memory storage
 * @param {string} mimeType - the multer-detected mime type
 * @returns {Promise<string>} extracted, whitespace-normalized text
 */
const extractText = async (buffer, mimeType) => {
  let rawText = "";

  if (mimeType === "application/pdf") {
    const data = await pdfParse(buffer);
    rawText = data.text;
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer });
    rawText = result.value;
  } else {
    throw new Error("Unsupported file type for parsing");
  }

  const cleaned = rawText.replace(/\s+/g, " ").trim();

  if (!cleaned || cleaned.length < 50) {
    throw new Error(
      "Could not extract enough text from this file. It may be a scanned image or empty."
    );
  }

  return cleaned;
};

module.exports = { extractText };
