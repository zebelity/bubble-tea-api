const express = require("express");
const router = express.Router();

const MenuItem = require('../models/menuItem.js');
const Review = require('../models/review.js');
const brand = require("../models/brand.js");

router.get('/', async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find()
    const brands = await brand.find()

    const results = []

    for (const menuItem of menuItems) {
      const brand = brands.find(b => b._id.toString() === menuItem.brandId.toString())

      results.push({
        ...menuItem.toJSON(),
        brand: brand.toJSON()
      })
    }

    res.json(results)
  } catch (e) {
    next(e)
  }
}) 

router.get('/:id', (req, res, next) => {
  MenuItem.findById(req.params.id)
  // .populate('reviews')
  .then(menuItem => res.json(menuItem))
  .catch(next)
})

router.post('/:id/reviews', (req, res, next) => {
  const { userId, content } = req.body
  const menuItemId = req.params.id;

  Review.create({ userId, menuItemId, content })
    .then(newReview => {
      return MenuItem.findByIdAndUpdate(
        menuItemId,
        { $push: { reviews: newReview._id } },
        { new: true }
      );
    })
    .then(updatedMenuItem => res.json(updatedMenuItem))
    .catch(next);
})

router.delete('/:id/reviews/:reviewId', (req, res, next) => {

  const userId = req.body.userId; 
  const menuItemId = req.params.id;
  const reviewId = req.params.reviewId;

  Review.findOneAndDelete({ _id: reviewId, userId, menuItemId })
    .then(deletedReview => {
      if (!deletedReview) {
        return res.status(404).json({ message: 'Review not found or unauthorized' });
      }
      return MenuItem.findByIdAndUpdate(
        menuItemId,
        { $pull: { reviews: reviewId } },
        { new: true }
      );
    })
    .then(updatedMenuItem => res.json(updatedMenuItem))
    .catch(next);
})

router.put('/menuItems/:id/reviews/:reviewId', (req, res, next) => {
  const userId = req.body.userId; 
  const menuItemId = req.params.id;
  const reviewId = req.params.reviewId;
  const updatedReview = req.body.updatedContent;

  Review.findOneAndUpdate(
    { _id: reviewId, userId, menuItemId },
    { content: updatedReview },
    { new: true }
  )
    .then(updatedReview => {
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found or unauthorized' });
      }
      return res.json(updatedReview);
    })
    .catch(next);
});

module.exports = router