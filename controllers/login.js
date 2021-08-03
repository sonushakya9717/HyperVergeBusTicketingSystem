const User = require("../models/Users");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const getSignedJwtToken = function (
  payload,
  secret = config.get("jwtSecret"),
  expiresIn = 40000
) {
  return jwt.sign(payload, secret, { expiresIn });
};

const validations = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = {
      error: "Please enter the password 8 or more characters",
      status: 400,
    };
    return err;
  } else {
    return false;
  }
};

const login = async (req, res, next) => {
  const errors = validations(req);
  if (errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };
    const token = getSignedJwtToken(payload);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
};

const adminLogin = async (req, res, next) => {
  const errors = validations(req);
  if (errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    else if(user.isAdmin !==true){
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };
    const token = getSignedJwtToken(payload);

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = { login, adminLogin };
