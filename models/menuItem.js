const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuItemSchema = new Schema(
  {
    brandId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Brand', 
      required: true
    },
    title: {
      type: String,
      required: true,
      minLength:5
    },
    img_url: {
      type: String,
      required: true
    },
    detail: {
      type:String,
      required: true,
      minLength:5,
    },
    calories: {
      type: Number
    }
  }
)

module.exports = mongoose.model('MenuItem', menuItemSchema);