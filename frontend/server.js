const express = require("express");
const axios = require("axios");

const app = express();
const BACKEND = process.env.BACKEND_URL || "http://backend:5000";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${BACKEND}/products`);
    const products = response.data;

    let html = "<h1>🛒 E-Commerce Store</h1><ul>";
    products.forEach(p => {
      html += `<li>${p.name} - $${p.price}</li>`;
    });
    html += "</ul>";

    res.send(html);
  } catch (err) {
    res.send("Error connecting to backend");
  }
});

app.listen(3000, () => console.log("Frontend running on port 3000"));
