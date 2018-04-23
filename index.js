'use strict';

//Obtaining MongoCLient class from mongodb library
var MongoClient = require('mongodb').MongoClient;

//Establishing connection with mongodb server
MongoClient.connect(
    'mongodb://localhost:27017',
    function (err, client) {
        var db = client.db('accounting');
        var collection = db.collection('customers');
      
        var doFind = function (callback) {
            collection.find().toArray(function (err, documents) {
                console.dir(documents);
                callback();
            });
        };

        var doInsert = function (i) {
            if (i < 20) {
                var value = Math.floor(Math.random() * 10);
                collection.insert(
                    { 'n': '#' + i, 'v': value },
                    function (err, count) {
                        doInsert(i + 1);
                    });
            } else {
                console.log();
                console.log('Inserted', i, 'documents:');
                doFind(function () {
                    doUpdate();
                });
            }
        };

        var doUpdate = function () {
            collection.update(
                { 'v': { '$gt': 5 } },
                { '$set': { 'valuable': true } },
                { 'multi': true },
                function (err, count) {
                    console.log();
                    console.log('Updated', count, 'documents:');
                    doFind(function () {
                        collection.remove({}, function () {
                            client.close();
                        });
                    });
                });
        };

        doInsert(0);

    });