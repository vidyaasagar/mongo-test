'use strict';

//Obtaining MongoCLient class from mongodb library
var MongoClient = require('mongodb').MongoClient;

//Establishing connection with mongodb server
MongoClient.connect(
    'mongodb://localhost:27017',
    function (err, client) {
        var db = client.db('accounting');
        var collection = db.collection('customers');
        //Updating a file
        collection.update({}, { '$set': { 'age': 24 } }, { 'multi': true }, function (err, count) {

            console.log('Updated', count, 'documents');

            collection.find().toArray(function (err, documents) {
                console.dir(documents);
                client.close();
            });

        });

    });