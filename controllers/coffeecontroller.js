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
router.get('/:id', (req,res) => {
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
router.delete(':/id', validateSession, (req,res) => {
    Coffee.destroy({
        where: {id: req.params.id, 
                // user_id: req.user.id, need to add hasmany to the user model
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
    Coffee.create({
        name: req.body.coffee.name,
        roast: req.body.coffee.roast,
        type: req.body.coffee.type,
        price: req.body.coffee.price,
        description: req.body.coffee.description,
        // user_id: req.user.id, need to add hasmany to the user controller
    })
    .then(coffee => res.status(200).json(coffee))
    .catch(err => res.status(500).json({
        error: err
    }));
        
});






module.exports = router;



