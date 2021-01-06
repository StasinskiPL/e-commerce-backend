const express = require("express");
const ProductController = require("../controllers/ProductsController");

const route = express.Router();

route.get("/products", ProductController.getProducts);

route.get("/product/:id", ProductController.getProductById);

route.get("/products/:category", ProductController.getProductsByCat);

route.post("/addproduct", ProductController.postProduct);

route.post("/editProduct/:id", ProductController.editProduct);

module.exports = route;
