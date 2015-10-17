var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/', function(req, res, next) {
    res.status_code = 200;
    res.json({ message: 'hooray! you are @ API !' });
    res.end();
});

mongoose.connect('mongodb://localhost:27017/eStore');



var Schema       = mongoose.Schema;
var ProductSchema   = new Schema({
    name: String,
    sku: String,
    price: Number
});


var Product = mongoose.model('Product', ProductSchema);
router.route('/products')
    .get(function(req, res) {
        Product.find(function(err, products) {
            if (err)
                res.send(err);
            console.log('list of products returned.');
            res.json(products);
        });
    })

    .post(function(req, res) {

        var product = new Product();

        product.name = req.body.name;
        product.sku = req.body.sku;
        product.price = req.body.price;

        product.save(function(err) {
            if (err)
                res.send(err);

            console.log('new product created');
            console.log(product);

            res.json({ message: 'Product created!' });
        });

    });

router.route('/products/:product_id')

    .get(function(req, res) {
        Product.findById(req.params.product_id, function(err, product) {
            if (err)
                res.send(err);

            console.log('get product by id');
            console.log(product);
            res.json(product);
        });
    })

    .put(function(req, res) {

        Product.findById(req.params.product_id, function(err, product) {

            if (err)
                res.send(err);

            product.name = req.body.name;
            product.sku = req.body.sku;
            product.price = req.body.price;


            // save the product
            product.save(function(err) {
                if (err)
                    res.send(err);

                console.log('update product by id');
                console.log(product);
                res.json({ message: 'Product updated!' });
            });

        });
    })

    .delete(function(req, res) {
    Product.remove({
            _id: req.params.product_id
        }, function(err, product) {
            if (err)
                res.send(err);

            console.log('delete product by id');
            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;