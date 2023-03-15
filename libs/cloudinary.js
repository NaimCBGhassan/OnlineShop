import { v2 as cloudinary } from "cloudinary";
import { api_key, api_secret, cloud_name } from "../config.js";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "OnlineShop",
  });
};

export const updateImage = async (filePath, public_id) => {
  const destroyedImage = await cloudinary.uploader.destroy(public_id);
  if (destroyedImage) {
    return await cloudinary.uploader.upload(filePath, { invalidate: true });
  }
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
