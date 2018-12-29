const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./environments/environments')[process.env.NODE_ENV || 'development'];
const port = process.env.PORT || 5000;
const cors = require('cors');

const app = express();
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

// Demo Route (GET http://localhost:5000)
app.get('/', function (req, res) {
    return res.send('Hello! The API is at http://localhost:' + port + '/api');
});

const routes = require('./routes');
app.use('/api', routes);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);