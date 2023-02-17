import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, desc, price } = req.body;
    let image;

    if (req.files?.image && req.files.image !== null) {
      const { secure_url, public_id } = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: secure_url,
        public_id: public_id,
      };
    }

    const createdProduct = new Product({ name, desc, price, image });
    const newProduct = await createdProduct.save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Post.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send(`Not Found`);

    if (deletedPost.image.public_id) await deleteImage(deletedPost.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
