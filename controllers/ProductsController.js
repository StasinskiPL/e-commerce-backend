const Product = require("../models/Product");

exports.getProducts = (req, res) => {
  Product.find()
    .then((data) => {
      res.json({ products: data });
    })
    .catch(() => {
      res.json({ products: [] });
    });
};

exports.getProductsByCat = (req, res) => {
  const category = req.params.category;
  Product.find({ category: category })
    .then((data) => {
      res.json({ products: data });
    })
    .catch(() => {
      res.json({ products: [] });
    });
};

exports.postProduct = (req, res) => {
  prod = new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    mainImage: req.body.mainImage,
    additionalImages: req.body.additionalImages || [],
  });
  prod.save();
  res.json({ message: "added" });
};

exports.editProduct = (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log();
  Product.findById(id).then((prod) => {
    if (prod) {
      prod.name = req.body.name;
      prod.description = req.body.description;
      prod.category = req.body.category;
      prod.mainImage = req.body.mainImage;
      prod.additionalImages = req.body.additionalImages || [];
      prod.save();
      return res.json({ massage: "updated" });
    }
    return res.json({ massage: "not found" });
  });
};
