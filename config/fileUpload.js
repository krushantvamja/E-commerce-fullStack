import cloudinaryPackage from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import 'dotenv/config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
const cloudinary = cloudinaryPackage.v2;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET_KEY,
})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    params : {
        folder : 'Ecommerce-api',
    }
});

const upload = multer({
    storage,
});

export default upload;