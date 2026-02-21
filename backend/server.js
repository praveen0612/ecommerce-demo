const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/ecommerce");

const Product = mongoose.model("Product", {
  name: String,
  price: Number
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => console.log("Backend running on port 5000"));
