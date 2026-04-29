/**
 * Cloudinary upload helper.
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * environment variables.
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer or base64 string to Cloudinary.
 * @param {string} fileData  - base64 data URI or remote URL
 * @param {string} folder    - Cloudinary folder name
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadFile(fileData, folder = "real-estate") {
  const result = await cloudinary.uploader.upload(fileData, {
    folder,
    resource_type: "auto",
  });
  return { url: result.secure_url, publicId: result.public_id };
}

/**
 * Delete a file from Cloudinary by its public ID.
 */
export async function deleteFile(publicId) {
  return cloudinary.uploader.destroy(publicId);
}
