/**
 * Created by mrx on 10/17/15.
 */

var express = require('express');
var mongoose   = require('mongoose');


var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('/api/');
    res.json({ message: 'hooray! welcome to our api!' });
    //res.send('respond with a API resource.');

});






mongoose.connect('mongodb://localhost:27017/eStore'); // connect to our database
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
    name: String
});

var Bear = mongoose.model('Bear', BearSchema);

router.route('/bears')


    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);
                console.log(bears);
            res.json(bears);
        });
    })



    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        console.log(req.body);


        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    });



router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    });



module.exports = router;
