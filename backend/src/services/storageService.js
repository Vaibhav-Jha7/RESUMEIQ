const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

/**
 * Uploads a file buffer to Cloudinary as a raw resource (PDF/DOCX aren't
 * images, so they must go through the "raw" resource type).
 * @param {Buffer} buffer - the file buffer from multer's memory storage
 * @param {string} originalName - original filename, used to build a readable public_id
 * @returns {Promise<{ url: string, publicId: string }>}
 */
const uploadBuffer = (buffer, originalName) => {
  return new Promise((resolve, reject) => {
    const safeName = originalName
      .replace(/\.[^/.]+$/, "") // strip extension
      .replace(/[^a-zA-Z0-9-_]/g, "_");
    const publicId = `resumes/${Date.now()}-${safeName}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // required for non-image files like pdf/docx
        public_id: publicId,
        folder: "", // publicId already includes the "resumes/" prefix
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

/**
 * Deletes a previously uploaded resume file from Cloudinary.
 * @param {string} publicId
 */
const deleteFile = async (publicId) => {
  await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
};

module.exports = { uploadBuffer, deleteFile };
