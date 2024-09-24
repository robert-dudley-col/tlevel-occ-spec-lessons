var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
var mongo = require('mongodb');

const uri = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/drinks', async function(req, res, next) {
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("products");
    const sites = await collection.find({type:"drink"}).toArray();
    res.json(sites);
    client.close();
});

module.exports = router;
