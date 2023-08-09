const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const createJsonWebToken = require('../library/createToken.js');
const AppError = require('../library/app_error');


router.post('/', async (req, res, next) => {
  //send in email & password
    const { email, password } = req.body
    // console.log({email})
    // console.log({password})
    try {
    //find the user by email
      const user = await User.findOne({email: email})

      if (!user) {
        throw new AppError(400, 'Invalid email or password')
      }
    //checks password with bcrypt
      const match = await bcrypt.compare(password, user.password_digest)
      if (!match) {
        throw new AppError(400, 'Invalid email or password')
      }
    // create a token
      const token = createJsonWebToken({id: user._id, email: user.email})
      res.json(token)
    } catch(err) {
      next(err)
    }
  //server redirect -> response with json with the token
  })

  module.exports = router