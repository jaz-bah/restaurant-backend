import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  image: String,
  collectionTag: String, // collection name
});

export default mongoose.model("Product", productSchema);
