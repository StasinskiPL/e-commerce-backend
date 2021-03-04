const express = require("express");
const controller = require("../controllers/products");
const requireAuth = require("../middleware/requireAuth");

const route = express.Router();

route.get("/products", controller.getProducts);

route.get("/product/:id", controller.getProductById);

route.get("/products/:category", controller.getProductsByCat);

route.post("/addproduct", requireAuth, controller.postProduct);

route.post("/editproduct/:id", requireAuth, controller.editProduct);

route.get("/getuserstore", requireAuth, controller.getUserStore);

route.post("/addtransation", requireAuth, controller.addUserTransation);

module.exports = route;
