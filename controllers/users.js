const { handleAsync } = require("../helpers/error");
const User = require("../models/users");
const faker = require("faker");
const jwt = require("jsonwebtoken");

module.exports.createUser = handleAsync(async function (req, res, next) {
  const base = {
    name: "User 1",
    email: faker.internet.email(),
  };
  const user = await User.create(base);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.send({
    success: true,
    token,
  });
});

module.exports.auth = handleAsync(async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  const token = authorization.replace("Bearer ", "");

  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(id);
  if (!id || !user) return next(new Error("Invalid credentials"));
  req.user = user;
  next();
});
