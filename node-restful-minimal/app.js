var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express();
var router = express.Router();

app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', function(req, res, next) {
    res.status_code = 200;
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api/', api);
app.listen(3000);

console.log('Server started @ 3000');
console.log('CTRL + C to close');

module.exports = app;
