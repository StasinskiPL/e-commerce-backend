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
      res.status(200).json({ product:prod});
    })
    .catch(() => {
      res.status(400).json({ error:"not found" });
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

exports.connectUser = (req,res)=>{
  const id = req.body.id;
    const user = new User({
      id:id,
      transation:[],
    })
    user.save();
    res.status(200).json({message:"user connected"});
}

exports.getUserStore = (req,res)=>{
  const id = req.query.id;
  User.findOne({id:id}).then((user)=>{
   return res.status(200).json({user:user})
  }).catch(()=>{
      return res.status(400).json({error:true})
  })
}

exports.addUserTransation = (req,res)=>{
  const id = req.body.id;
  const transation = req.body.transation;
  User.findOne({id:id}).then(user=>{
    user.transations = user.transations.concat(transation);
    user.save().then(()=>{
    return res.status(200).json({error:false, message:"successfully added transation"})
    });
  }).catch(()=>{
    return res.status(400).json({error:true,message:"something went wrong"})
  })
  }
