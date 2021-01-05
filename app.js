const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
var cors = require('cors');


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


app.use(cors({origin: '*'}));



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(port);
