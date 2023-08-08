const mongoose = require('mongoose');

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
  menuItemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    // required: true 
  },
  content: { 
    type: String,
    required: true,
    minLength: 3
  },
  score: {
    type: Number,
    required: true
  }
  }, {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewSchema);
