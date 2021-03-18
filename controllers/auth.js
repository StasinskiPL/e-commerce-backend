const schema = require("../helpers/validation");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(401).send(validation.error);
  }
  const { email, password } = req.body;

  const emailExist = await User.findOne({ email: email });

  if (emailExist) {
    res.status(400).send({ error: "Email Already Exist" });
  }

  const user = new User({
    email,
    password,
  });
  try {
    const saveUser = await user.save();
    const token = jwt.sign({ _id: user._id }, "MY_SECRET_KEY");
    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    return res.json({ user: saveUser });
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "wrong email or password" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ _id: user._id }, "MY_SECRET_KEY");
    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    res.send("LOGGED IN");
  } catch (error) {
    return res.status(400).send({ message: "wrong email or password" });
  }
};
