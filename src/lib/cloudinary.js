import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;
