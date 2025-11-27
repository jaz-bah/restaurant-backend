import express from "express";
import Collection from "../models/collection.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const collection = await Collection.create(req.body);
  res.json(collection);
});

// Get single collection with populated products
router.get("/:name", async (req, res) => {
  const collection = await Collection.findOne({ name: req.params.name })
    .populate("products");

  res.json(collection);
});

// Get all collections
router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find().select("name");
    res.status(200).json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default router;
