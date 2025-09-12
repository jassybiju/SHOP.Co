import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export const uploadImages = async (req) => {
    const uploadResults = [];
    for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "brand",
        });

        fs.unlinkSync(file.path);
        uploadResults.push(result.secure_url);
    }
    return uploadResults
};

export default cloudinary;
