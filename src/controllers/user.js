const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signUp = async (req, res, next) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The email Id is already registered with us");
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save();
  let email = user.email;
  let userId = user._id;
  const token = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  return res.status(201).json({
    message: "User created successfully!",
    token: token,
  });
};

exports.logIn = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).send("Invalid Email or password");
    return;
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) {
    res.status(400).send("Invalid Email or password");
    return;
  }
  let email = user.email;
  let userId = user._id;
  const token = jwt.sign(
    {
      email: email,
      userId: userId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  return res.status(200).json({
    message: "Auth Successful!",
    token: token,
  });
};
