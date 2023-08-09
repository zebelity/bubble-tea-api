require("dotenv").config();
const jwt = require('jsonwebtoken');

function createJsonWebToken(data) {
  return jwt.sign(data, process.env.SECRET, { expiresIn: "24hr" })
}

module.exports = createJsonWebToken