const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log(accessToken);
  if (!accessToken) {
    return res.status(401).send({ error: "You must be logged in." });
  }
  jwt.verify(accessToken, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }
    const { _id: id } = payload;

    const user = await User.findById(id);
    req.user = user;
    next();
  });
};
