/**
 * Created by mrx on 10/18/15.
 */

var mongoose   = require('mongoose');
var connect = mongoose.connect('mongodb://localhost:27017/eStore');

module.exports = connect;