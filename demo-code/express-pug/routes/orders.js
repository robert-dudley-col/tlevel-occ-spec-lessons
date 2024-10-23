var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
var mongo = require('mongodb');

var databaseLink = 'mongodb://localhost:27017';

router.post('/', async function(req,res,next){
    try {
        var site = req.body.site;
        var user = req.body.user;

        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');

        var basket = await database.collection('baskets').findOne({
            user:user
        })

        if(basket.items.length >= 1)
        {
            var newOrder = await database.collection('orders').insertOne({
                user:user,
                site:site,
                items:basket.items,
                timestamp: Date.now()
            });

            res.json({order:newOrder.insertedId.toString()})
        }else{
            res.status(500).json({error:"User has no items in their basket"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Could not create order"})
    }
});

router.get('/:order',async function(req,res,next){
    try {
        var order_id = req.params.order;
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');

        var order = await database.collection('orders').findOne({
            _id:new mongo.ObjectId(order_id)
        })

        var products = await database.collection('products').find().toArray();

        var total = 0;
        var itemsData = [];

        for(const item of order.items)
        {
            for(const product of products)
            {
                if(item.item == product._id)
                {
                    itemsData.push({
                        item:item.item,
                        quantity:item.quantity,
                        price:product.price,
                        image: product.image,
                        name:product.name
                    })
                    total = total + (item.quantity * product.price)
                }
            }
        }

        var site = await database.collection('sites').findOne({
            _id: new mongo.ObjectId(order.site)
        })

        res.json({
            site:site.name,
            items:itemsData,
            total:total,
            timestamp:order.timestamp
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Could not get order"})
    }
});

module.exports = router;