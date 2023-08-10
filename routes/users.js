const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user.js');
const createJsonWebToken = require('../library/createToken.js');
const AppError = require('../library/app_error');


router.post('/', async (req, res, next) => {

    const { email, password } = req.body

    try {
      const user = await User.findOne({email: email})

      if (!user) {
        throw new AppError(400, 'Invalid email or password')
      }

      const match = await bcrypt.compare(password, user.password_digest)
      if (!match) {
        throw new AppError(400, 'Invalid email or password')
      }
  
      const token = createJsonWebToken({id: user._id, email: user.email})
      res.json({token, user})
    } catch(err) {
      next(err)
    }

  })

  module.exports = router