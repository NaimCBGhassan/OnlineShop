import { deleteImage, updateImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Product from "../models/Product.js";

/* GET ALL PRODUCTS */

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

/* GET ONE PRODUCT */

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById({ _id: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

/* CREATE */
export const createProduct = async (req, res) => {
  try {
    const { name, brand, desc, price } = req.body;
    let image;

    if (req.files?.image && req.files.image !== null) {
      const { secure_url, public_id } = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: secure_url,
        public_id: public_id,
      };
    }

    const createdProduct = new Product({ name, brand, desc, price, image });
    const newProduct = await createdProduct.save();
    return res.json(newProduct);
  } catch (error) {
    res.status(500).json([{ message: "Internal server error" }]);
  }
};

/* UPDATE */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand, desc, price } = req.body;
  let image;

  try {
    const product = await Product.findById({ _id: id });
    if (req.files?.image && req.files.image !== null) {
      const { secure_url, public_id } = await updateImage(req.files.image.tempFilePath, product.image.public_id);

      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: secure_url,
        public_id: public_id,
      };
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name, brand, desc, price, image },
      { new: true }
    );

    return res.json(updatedProduct);
  } catch (error) {
    res.status(500).json([{ message: "Internal server error" }]);
  }
};

/* DELETE */

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(deletedProduct);
    if (!deletedProduct) return res.status(404).send([{ message: `Products not found` }]);

    if (deletedProduct.image.public_id) await deleteImage(deletedProduct.image.public_id);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send([{ message: error.message }]);
  }
};
