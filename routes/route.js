const express = require("express");
const controller = require("../controllers/controller");

const route = express.Router();

route.get("/products", controller.getProducts);

route.get("/product/:id", controller.getProductById);

route.get("/products/:category", controller.getProductsByCat);

route.post("/addproduct", controller.postProduct);

route.post("/editproduct/:id", controller.editProduct);

route.get("/getuserstore", controller.getUserStore);

route.post("/connectuser", controller.connectUser);

route.post("/addtransation", controller.addUserTransation);

module.exports = route;
