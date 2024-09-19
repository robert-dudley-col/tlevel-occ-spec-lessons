var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', async function(req, res, next) {
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("sites");
    const sites = await collection.find().toArray();
    res.json(sites);
    client.close();
});

module.exports = router;
