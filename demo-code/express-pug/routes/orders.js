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

async function GetOrder(order_id){
    try {
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

        return({
            site:site.name,
            items:itemsData,
            total:total,
            timestamp:order.timestamp,
            id:order_id
        });

    } catch (error) {
        console.log(error);
        return false;
    }
}

router.get('/:order',async function(req,res,next){
    try {
        var order_id = req.params.order;
        var order = await GetOrder(order_id);

        if(order!==false)
        {
            res.json(order)
        }else{
            res.status(500).json({error:"Could not get order"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Could not get order"})
    }
});

//localhost:3000/orders/user/<users id>
//returns all the orders for a specific user
router.get('/user/:userid', async function(req,res,next){
    try {
        var user_id = req.params.userid;
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('orders');

        var orders_db = await collection.find({
            user:user_id
        }).toArray();

        if(orders_db.length>=1)
        {
            var orders = [];
            for(const order_db of orders_db){
                var order = await GetOrder(order_db._id);
                orders.push(order);
            }

            res.json(orders);
        }else{
            res.status(500).json({error:"User has no orders"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Could not get users orders"});
    }
});

//localhost:3000/orders/site/<site id>
//load all the orders for a specific site
router.get('/site/:siteid', async function(req,res,next){
    try {
        var site_id = req.params.siteid;
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('orders');

        var orders_db = await collection.find({
            site:site_id
        }).toArray();

        if(orders_db.length>=1)
        {
            var orders = [];
            for(const order_db of orders_db){
                var order = await GetOrder(order_db._id);
                orders.push(order);
            }

            res.json(orders);
        }else{
            res.json([])
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Could not get users orders"});
    }
});

module.exports = router;