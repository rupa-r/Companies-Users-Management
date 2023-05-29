const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

let database;

async function getDatabase(params) {
 const client = await MongoClient.connect('mongodb://localhost:27017');

 database = client.db('db');

 if (!database) {
    console.log("DB not Connected");
 }

 return database;
}

module.exports = {
    getDatabase,
    ObjectID
};