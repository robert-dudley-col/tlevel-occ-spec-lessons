var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
var mongo = require('mongodb');

const databaseLink = "mongodb://127.0.0.1:27017/";

router.get('/', async function(req,res,next){
    try{
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('sites');

        const sites = await collection.find().toArray();

        res.json(sites)

        client.close();
    }catch{
        res.status(500).json({error:"Could not load sites"})
    }
});

router.get('/:site', async function(req,res,next){
    try{
        var siteid = req.params.site;
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('sites');

        const site = await collection.findOne({
            _id: new mongo.ObjectId(siteid)
        })

        res.json(site);

        client.close();
    }catch{
        res.status(500).json({error:"Could not load site"})
    }
});


module.exports = router;