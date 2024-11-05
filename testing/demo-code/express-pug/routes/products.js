var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
var mongo = require('mongodb');

const databaseLink = 'mongodb://localhost:27017/';

//localhost:3000/products/drinks - GET
router.get('/drinks',async function(req,res,next){
    try{
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('products');
        var drinks = await collection.find({type:'drink'}).toArray();

        res.json(drinks);

        client.close();

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Cannot get drinks"})
    }
});

router.get('/food',async function(req,res,next){
    try{
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('products');
        var food = await collection.find({type:'food'}).toArray();

        res.json(food);

        client.close();

    }catch(error){
        console.log(error);
        res.status(500).json({error:"Cannot get drinks"})
    }
});

//add in another router.get
//food - url is - localhost:3000/products/food - GET


module.exports = router;