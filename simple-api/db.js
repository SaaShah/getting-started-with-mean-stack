var MongoClient = require('mongodb').MongoClient;
var database;
var getDatabaseConnection = function(callback) {
        if(database) {
                callback(database);
                return;
        } else {
                MongoClient.connect('mongodb://127.0.0.1:27017/test',
                        function(err, db) {
                                if(err) {
                                        // throw err;
                                        console.log(err);
                                };
                                database = db;
                                
                                console.log('db connected..!');
                                callback(database);
                                console.log('processed');
                                db.close();
                        });
        }
};
getDatabaseConnection(


        function(db){

                var collection = db.collection('foods');
                var data = {'null; data.foodId =':' food._id.toString();'};

                collection.insert(data);
                console.log(data);
        });

