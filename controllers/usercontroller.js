require("dotenv").config();

const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', function (req, res) {
    
    let email = req.body.user.email;
    let pass = req.body.user.password;

    User.create({
        email: email,
        password: bcrypt.hashSync(pass, 10),
        admin: req.body.user.admin
    }).then(
        function createSuccess(user) {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            console.log(`HERE IS THE TOKEN => ${token}`)
                res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
                });
        },
        function createError(err) {
            console.log(err);
            res.send(500, err.message);
        }
    );
});

router.post('/signin', function(req, res) {
    User.findOne({ where: { email: req.body.user.email}}).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password,
                user.password, function(err, matches) {
                    if (matches) {
                        var token = jwt.sign({id: user.id},
                        process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                        } else {
                            res.status(502).send({ error: "bad gateway"});
                        }
                    });
            } else {
                res.status(500).send({ error: "failed to authenticate"});
            }
        },
        function(err) {
            res.status(501).send({ error: "failed to process"});
        });
});

module.exports = router;