const schema = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error);
  }
  const { email, password } = req.body;

  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    return res.status(400).json({ message: "Email Already Exist" });
  }

  const user = new User({
    email,
    password,
  });
  try {
    const saveUser = await user.save();
    return res.json(saveUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "wrong email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ _id: user._id }, "MY_SECRET_KEY");
    res.header("auth-token", token).send({ token });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "wrong email or password" });
  }
};
