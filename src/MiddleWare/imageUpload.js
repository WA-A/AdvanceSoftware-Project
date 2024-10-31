import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from "cloudinary";

const cloudinary = pkg.v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Cloudinary storage configuration
export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "RentItOut", // The folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"], // Adjust allowed formats
    resource_type: "image", // Ensure resource type is set correctly
    filename: (req, file, cb) => {
      if (cb && typeof cb === "function") {
        cb(null, file.originalname); // Use the original file name for the uploaded image
      } else {
        console.error("Callback is not a function:", cb);
      }
    },
  },
});
