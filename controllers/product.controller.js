import { uploadImage } from "../libs/cloudinary.js";
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

    console.log(req.files);
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
