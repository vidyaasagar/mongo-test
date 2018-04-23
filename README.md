# Applying CRUD operations with low level mongodb driver

## Inserting  a document to a customer collection
```
'use strict';

//Obtaining MongoCLient class from mongodb library
var MongoClient = require('mongodb').MongoClient;

//Establishing connection with mongodb server
MongoClient.connect(
    'mongodb://localhost:27017',
    function (err, client) {
        var db = client.db('accounting');
        var collection = db.collection('customers');
        //insertion operation
        collection.insert({ 'name': 'John Doe' }, function (err, count) {
            //selecting all documents
            collection.find().toArray(function (err, documents) {
                //console.dir(documents);
                client.close();
            });

        });

    });
```
## Updating  all documents in a customer collection

```
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
                connection.close();
            });

        });

    });

```

## Updating a document with a particular condition is matching

```
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
          {'n': '#' + i, 'v': value},
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
```