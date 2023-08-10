const express = require("express");
const router = express.Router();
const ensureLoggedIn = require('../middlewares/ensure_logged_In');

const MenuItem = require("../models/menuItem.js");
const Review = require("../models/review.js");
const Brand = require("../models/brand.js");
const User = require("../models/user.js")


router.get('/', async (req, res, next) => {
  try {
    const menuItems = (await MenuItem.find()).map(v => v.toJSON())
    const brands = (await Brand.find()).map(v => v.toJSON())
    const reviews = (await Review.find()).map(v => v.toJSON())

    const results = []

    for (const menuItem of menuItems) {
      const brand = brands.find(b => 
        b._id.toString() === menuItem.brandId.toString())

      const _reviews = reviews.filter(r => 
        r.menuItemId.toString() === menuItem._id.toString())

      results.push({
        ...menuItem,
        brand,
        reviews: _reviews
      })
    }

    res.json(results)
  } catch (e) {
    next(e)
  }
}) 

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
  try {
    const menuItem = (await MenuItem.findById(req.params.id)).toJSON()
    const brands = (await Brand.find()).map(v => v.toJSON())
    const reviews = (await Review.find().populate("userId")).map(v => v.toJSON())
  

    const brand = brands.find(b => 
      b._id.toString() === menuItem.brandId.toString())

    const review = reviews.filter(r => 
      r.menuItemId.toString() === menuItem._id.toString())
    
    res.json({...menuItem, brand, reviews: review})

  } catch(e) {
    next(e)
  }
}) 

router.post('/:id/reviews', ensureLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id
    const { content, score } = req.body
    const menuItemId = req.params.id;
    const review = await Review.create({ userId, menuItemId, content, score })
    console.log(review)
    
    res.json(review)
  } catch(e) {
    next(e)
  }
})

router.delete('/:id/reviews/:reviewId', ensureLoggedIn, (req, res, next) => {

  const userId = req.body.userId; 
  const menuItemId = req.params.id;
  const reviewId = req.params.reviewId;

  Review.findByIdAndDelete({ _id: reviewId, userId, menuItemId })
    .then(menuItem => res.json(menuItem))
    .catch(next);
})

router.put('/:id/reviews/:reviewId', ensureLoggedIn, (req, res, next) => {
  console.log(req.body)
  const userId = req.body.userId;
  const menuItemId = req.params.id;
  const reviewId = req.params.reviewId;
  const updatedReview = req.body.content;


  Review.findByIdAndUpdate(
    { _id: reviewId, userId, menuItemId },
    { content: updatedReview },
    { new: true }
  )
    .then(menuItem => res.json(menuItem))
    .catch(next);
});

module.exports = router