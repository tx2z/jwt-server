const express = require('express'),
    routes = express.Router();
const userController = require('./controller/user-controller');
const passport = require('passport');

routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
/*
 * this rute is only for testing propourses you may not needed it :)
 */
routes.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}!` });
});

module.exports = routes;