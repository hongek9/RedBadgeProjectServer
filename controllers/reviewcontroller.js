const router = require('express').Router();
const Review = require('../db').import('../models/review');
const validateSession = require('../middleware/validate-session');

//Get//
router.get('/review', (req, res) => {
  Review.findAll()
  .then(review => res.status(200).json(review))
        .catch(err => res.status(500).json({
            error: err
        }))
})

//Create//
router.post('/review', validateSession, (req, res) => {
  const postReview = {
    message: req.body.message,
    owner: req.body.owner
  }
  Review.create(postReview)
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({error: err}))
})

// Delete //
router.delete('/:id', (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({
    error: err
  }))
})

//Update//
router.put('/:id', (req, res) => {
  Review.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(review => res.status(200).json(review))
  .catch(err => res.status(500).json({
    error: err
  }))
})

module.exports = router;