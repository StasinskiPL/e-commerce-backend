const Product = require("../models/Product");
const User = require("../models/User");

exports.getProducts = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({ products: data });
    })
    .catch(() => {
      res.status(400).json({ products: [] });
    });
};

exports.getProductById = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((prod) => {
      res.status(200).json({ product: prod });
    })
    .catch(() => {
      res.status(400).json({ error: "not found" });
    });
};

exports.getProductsByCat = (req, res) => {
  const category = req.params.category;
  Product.find({ category: category })
    .then((data) => {
      res.status(200).json({ products: data });
    })
    .catch(() => {
      res.status(400).json({ products: [] });
    });
};

exports.postProduct = (req, res) => {
  prod = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    mainImage: req.body.mainImage,
    additionalImages: req.body.additionalImages || [],
  });
  prod.save();
  res.status(200).json({ message: "added" });
};

exports.editProduct = (req, res) => {
  const id = req.params.id;
  Product.findById(id).then((prod) => {
    if (prod) {
      prod.name = req.body.name;
      prod.description = req.body.description;
      prod.category = req.body.category;
      prod.mainImage = req.body.mainImage;
      prod.price = req.body.price;
      prod.additionalImages = req.body.additionalImages || [];
      prod.save();
      return res.sattus(200).json({ massage: "updated" });
    }
    return res.status(400).json({ massage: "not found" });
  });
};

// user

exports.getUserStore = (req, res) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch(() => {
      return res.status(400).json({ error: true });
    });
};

exports.addUserTransation = (req, res) => {
  const userId = req.user._id;
  const itemTransation = req.body.transation;

  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;

  const date = `${day}-${month}-${year}`;

  const transation = {
    date: date,
    products: itemTransation,
  };

  User.findOne({ _id: userId })
    .then((user) => {
      user.transations = [...user.transations, transation].filter(
        (e) => e !== []
      );
      user.date = date;
      user.save().then(() => {
        return res.status(200).json({ transation });
      });
    })
    .catch(() => {
      return res
        .status(400)
        .json({ error: true, message: "something went wrong" });
    });
};
