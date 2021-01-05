const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;

const productRoute = require("./routes/Products");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://dawid:dawid@shop.j0r2p.mongodb.net/Shop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
  
  app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });
  


  app.use("/", productRoute);


app.listen(port);
