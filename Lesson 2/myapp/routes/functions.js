const { MongoClient } = require("mongodb");
var mongo = require('mongodb');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";

async function CheckToken(token)
{
    //connect to the database
    const client = new MongoClient(uri);

    //select the database on the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("users");

    //query the database for the number of users with matching userid
    var numUsers = await collection.countDocuments({
        _id: new mongo.ObjectId(token)
    })
    
    //return true if there is one user
    //return false if there is not one user
    return numUsers==1;
}

//this allows the function to be accessable from outside this file
// very similar to having a public function
module.exports = {CheckToken};