const jwt = require("jsonwebtoken");
const config = require("config");


const getSignedJwtToken = function (
    payload,
    secret = config.get("jwtSecret"),
    expiresIn = 40000
  ) {
    return jwt.sign(payload, secret, { expiresIn });
  };

module.exports = { getSignedJwtToken }