import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from "cloudinary";

const cloudinary = pkg.v2;
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME || dbwuzcbme;
const cloud_api_key = process.env.CLOUDINARY_API_KEY || 842262788651257;
const cloud_api_secret =
  process.env.CLOUDINARY_API_SECRET || zNimO8t4am9QIhNvXfZPCmHelVA;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: cloud_api_key,
  api_secret: cloud_api_secret,
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
