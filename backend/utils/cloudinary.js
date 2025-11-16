import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

export const uploadImages = async (req, folder) => {
    const uploadResults = [];
    for (const file of req?.files || []) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folder,
        });
        console.log(file.path)
        // fs.unlinkSync(file.path);
        uploadResults.push(result.public_id);
    }
    return uploadResults;
};

export default cloudinary;


export const getPublicIdFromUrl = (url) => {
  if (typeof url !== "string") return null;

  try {
    // remove query params (everything after ?)
    const cleanUrl = url.split("?")[0];

    // take everything after /upload/
    let publicIdWithExt = cleanUrl.split("/upload/")[1];
    if (!publicIdWithExt) return null;

    // remove version numbers like v123/
    publicIdWithExt = publicIdWithExt.replace(/^v[0-9]+\/+/, "");

    // remove file extension (e.g., .jpg, .png)
    return publicIdWithExt.replace(/\.[^/.]+$/, "");
  } catch (err) {
    console.error("Error extracting public_id:", err);
    return null;
  }
};
