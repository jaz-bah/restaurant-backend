import express from "express";
import upload from "../config/multer.js";
import Product from "../models/product.model.js";
import Collection from "../models/collection.model.js";

const router = express.Router();

// Create product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, rating, collectionTag } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const product = await Product.create({
      name,
      price,
      rating,
      collectionTag,
      image: req.file.path,
    });

    let collection = await Collection.findOne({ name: collectionTag });
    if (!collection) {
      collection = await Collection.create({ name: collectionTag, products: [] });
    }

    collection.products.push(product._id);
    await collection.save();

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
