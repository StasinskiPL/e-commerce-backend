const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

const productsRoute = require("./routes/products");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://dawid:dawid@shop.j0r2p.mongodb.net/Shop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(productsRoute);
app.use("/user", authRoute);

app.listen(port);
