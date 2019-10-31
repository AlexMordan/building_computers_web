require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const casePC = require("./routes/case");
const clients = require("./routes/clients");
const cpu = require("./routes/cpu");
const memory = require("./routes/memory");
const motherboard = require("./routes/motherboard");
const power_supply = require("./routes/power_supply");
const product = require("./routes/product");
const ssd = require("./routes/ssd");
const video_cards = require("./routes/video_cards");
const auth = require("./routes/auth");

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', process.env.LOCAL_DOMEN ? process.env.LOCAL_DOMEN : 'https://app-mycursach.herokuapp.com/');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client'));

app.use('/api/case', casePC);
app.use('/api/clients', clients);
app.use('/api/cpu', cpu);
app.use('/api/memory', memory);
app.use('/api/motherboard', motherboard);
app.use('/api/power_supply', power_supply);
app.use('/api/product', product);
app.use('/api/ssd', ssd);
app.use('/api/video_cards', video_cards);
app.use('/api/auth', auth);

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/client/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);