const router = require('express').Router();
const Coffee = require('../db').import('../models/coffee');
const validateSession = require('../middleware/validate-session');


/******************************
 * GET COFFEE BY ROAST
 ******************************/
router.get('/:roast', (req,res) => {
    Coffee.findAll({
        where: {roast: req.params.roast}
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/******************************
 * GET SPECFIC COFFEE (by ID)
 ******************************/
router.get('/select/:id', (req,res) => {
    Coffee.findOne({
        where: {id: req.params.id}
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/***********************************************
 * DELETE SPECIFIC COFFEE (admin only property)
 **********************************************/
router.delete('/:id', validateSession, (req,res) => {
    Coffee.destroy({
        where: {id: req.params.id, 
            userId: req.user.id
        }
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({
        error: err
    }));
});

/***********************************************
 * CREATE A COFFEE (admin only property)     
 **********************************************/
router.post('/',  validateSession, (req,res) => {
    console.log(req.user);
    Coffee.create({
        name: req.body.coffee.name,
        roast: req.body.coffee.roast,
        type: req.body.coffee.type,
        price: req.body.coffee.price,
        description: req.body.coffee.description,
        userId: req.user.id
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({
        error: err
    }));
        
});

/***********************************************
 * UPDATE A COFFEE (admin only property)     
 **********************************************/
router.put('/:id', validateSession, (req, res) => {
    Coffee.update(req.body.coffee, {
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



