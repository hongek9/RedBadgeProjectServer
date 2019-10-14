const router = require('express').Router();
const Review = require('../db').import('../models/review');
const validateSession = require('../middleware/validate-session');

//Get//
router.get('/:id', (req, res) => {
  Review.findAll({
    where: {coffeeId: req.params.id }
  })
  .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({
            error: err
        }))
})

//Create//
router.post('/:id', validateSession, (req, res) => {
  const postReview = {
    message: req.body.review.message,
    userId: req.user.id,
    coffeeId: req.params.id

  }
  Review.create(postReview)
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: err}))
})

// Delete //
router.delete('/:id',validateSession, (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({
    error: err
  }))
})

//Update//
router.put('/:id', validateSession, (req, res) => {
  Review.update(req.body.review, {
    where: {
      id: req.params.id,
      userId: req.user.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({
    error: err
  }))
})

module.exports = router;