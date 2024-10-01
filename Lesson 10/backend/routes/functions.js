const { MongoClient } = require("mongodb");
var mongo = require('mongodb');

const uri = "mongodb://localhost:27017/";

async function CheckUserStaff(userid)
{
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("users");
    const user = await collection.findOne({
        _id: new mongo.ObjectId(id)
    })

    return user.staff
}

module.exports = {CheckUserStaff};