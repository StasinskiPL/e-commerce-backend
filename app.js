const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;

const productRoute = require("./routes/Products");

app.use(express.json());
app.use("/", productRoute);

mongoose.connect(
  "mongodb+srv://dawid:dawid@shop.j0r2p.mongodb.net/Shop?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(port, () => {
  console.log(port);
});
