'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
    'mongodb://localhost:27017',
    function(err, client) {
        var db = client.db('accounting');
        var collection = db.collection('customers');

      collection.insert({'name': 'John Doe'}, function(err, count) {

        collection.find().toArray(function(err, documents) {
          //console.dir(documents);
          client.close();
        });

      });

    });