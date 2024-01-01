import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // Upload The FIle On CLoudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //FIle Has Been Uploader succesfull
        console.log("File Is Uploaded On Cloudinary", response.url)

        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)  //Remove the localy saved temporary file operation failed
        return null;
    }
}

export { uploadOnCloudinary }