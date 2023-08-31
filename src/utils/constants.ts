export const maxImageUploadSize = 0.5 * 1024 * 1024; // Change first operand to whatever max size you need in megabytes

export const notAllowedBlogSlugs = [
  "settings",
  "posts",
  "contact",
  "contact-us",
  "about",
  "about-us",
]; // Slugs that are not allowed to be used as blog slug

export const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
};
