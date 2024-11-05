var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb');
var mongo = require('mongodb');

var databaseLink = 'mongodb://localhost:27017/';

async function CheckExistingBasket(userid){
    const client = new MongoClient(databaseLink);
    const database = client.db('coffee');
    const collection = database.collection('baskets');

    const basket = await collection.countDocuments({
        user:userid
    })

    return basket == 1;
}

async function GetBasket(userid){
    try {
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');

        var basket = await database.collection('baskets').findOne({
            user:userid
        })

        var products = await database.collection('products').find().toArray();
        
        var total = 0;
        var newBasket = [];

        for(const item of basket.items){
            for(const product of products){
                if(product._id == item.item){
                    newBasket.push({
                        price:product.price,
                        name:product.name,
                        quantity:item.quantity,
                        id:item.item,
                        image:product.image
                    })
                    total = total + (item.quantity * product.price);
                }
            }
        }

        return {
            items:newBasket,
            total:total
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}

//localhost:3000/baskets?user=id - GET
router.get('/', async function(req,res,next){
    try {
        var user = req.query.user;
        if(await CheckExistingBasket(user))
        {
            var basket = await GetBasket(user);
            if(basket == false)
            {
                res.status(500).json({error:"Could not get basket"})
            }else{
                res.json(basket)
            }
        }else{
            res.json({
                items:[],
                total:0
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Could not get basket"})
    }
});

//localhost:3000/basksets/item - POST
// body <- item to be added & the user whos basket its being added to
router.post('/item', async function(req,res,next){
    try {
        var user = req.body.user;
        var item = req.body.item;


        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('baskets');
        if(await CheckExistingBasket(user))
        {

            var basket = await collection.findOne({
                user:user
            })

            var items = basket.items;
            var newItems = [];
            var itemInArray = false;

            for(const dbitem of items)
            {
                if(dbitem.item == item)
                {
                    dbitem.quantity = dbitem.quantity + 1;
                    itemInArray = true;
                }
                newItems.push(dbitem);
            }

            if(itemInArray == false){
                newItems.push({
                    item:item,
                    quantity:1
                })
            }

            await collection.updateOne({
                user:user
            },{
                "$set":{
                    items:newItems
                }
            })
        }else{
            await collection.insertOne({
                user:user,
                items:[{
                    item:item,
                    quantity:1
                }]
            })
        }

        res.json(await GetBasket(user))
        client.close();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Could not add item to basket"})
    }
})

// localhost:3000/basket/item - DELETE
// remove an item from the basket
// body < user + item
router.delete('/item', async function(req,res,next){
    try {
        //get the values from the body of the request for the user and item
        var user = req.body.user;
        var item = req.body.item;

        //establish our database connection
        const client = new MongoClient(databaseLink);
        const database = client.db('coffee');
        const collection = database.collection('baskets');

        //check if the user already has a basket
        if(await CheckExistingBasket(user))
        {
            //get the user's basket from the database
            var basket = await collection.findOne({
                user:user
            })

            var items = basket.items;
            var newItems = [];
            for(const dbItem of items)
            {
                if(dbItem.item != item)
                {
                    newItems.push(dbItem);
                }else{
                    if(dbItem.quantity != 1)
                    {
                        newItems.push({
                            item:dbItem.item,
                            quantity: dbItem.quantity - 1
                        })
                    }
                }
            }

            await collection.updateOne({
                user:user
            },{
                "$set":{
                    items:newItems
                }
            })

            res.json(await GetBasket(user));
            client.close();
        }else{
            //if the user does not have a basket return an error code
            //and close database connection
            res.status(500).json({error:"User does not have a basket"})
            client.close();
        }
    } catch (error) {
        //if there's an error, log it to console and return back an error code with
        //a brief explaination
        console.log(error)
        res.status(500).json({error:"Could not remove item from basket"})
    }
})

module.exports = router;