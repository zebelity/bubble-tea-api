const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
  email: { 
    type: String, 
    required: true },
  username: { 
    type: String, 
    required: true },
  password_digest: { 
    type: String, 
    required: true },
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password_digest')) {
    return next()
  }
  this.password_digest = await bcrypt.hash(this.password_digest, 10)

  next()
})

module.exports = mongoose.model('User', userSchema);