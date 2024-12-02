
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Create Cloudinary storage engine
let storage;

try {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'products', // Folder where images will be stored on Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
      transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional: Resize the image
    },
  });
} catch (error) {
  console.error('Error configuring Cloudinary storage:', error);
  throw error;
}


// Configure multer with Cloudinary storage
const upload = multer({ storage });

export default upload;
