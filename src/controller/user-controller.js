const User = require('../models/user');
const jwt = require('jsonwebtoken');
var request = require('request');
const config = require('../environments/environments')[process.env.NODE_ENV || 'development'];


function createToken(user) {
    let credentials = {
        id: user.id,
        email: user.email,
        /*
         * Add here your custom payload.
         */
    };

    return jwt.sign(credentials, config.JWTSECRET, {
        expiresIn: 86400 // 86400 expires in 24 hours
    });
}

exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        /*
         * Add here the logic and validations that you need and change it as well
         * in the user model if needed.
         */

        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    'msg': err
                });
            }
            return res.status(201).json(user);
        });

    });
};

exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }

        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
    });
};