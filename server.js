import dotenv from "dotenv";
dotenv.config();  // ← MUST be first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoute from "./routes/product.js";
import collectionRoute from "./routes/collection.js";
import mailRoute from "./routes/mail.js";



const app = express();
app.use(cors());
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URL, { connectTimeoutMS: 60000 })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/product", productRoute);
app.use("/collection", collectionRoute);
app.use("/mail", mailRoute);

app.listen(5000, () => console.log("Server running on 5000"));
