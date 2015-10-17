var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var restify = require('express-restify-mongoose');


var app = express();
var router = express.Router();

app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

router.get('/', function(req, res, next) {
    res.json({ message: 'hooray! welcome to our api!' });
});

var connect = mongoose.connect('mongodb://localhost:27017/eStore');


restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
    name: { type: String, required: true },
    comment: { type: String }
})));

app.use(router);

app.listen(3000);

console.log('Server started @ 3000');
console.log('CTRL + C to close');

module.exports = app;
