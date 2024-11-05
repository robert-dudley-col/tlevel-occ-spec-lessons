var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
var mongo = require('mongodb');
var CrpytoJS = require('crypto-js');

const databaseLink = "mongodb://localhost:27017/";

//localhost:3000/users/aksdkajsdha/email
router.get('/:id/email', async function(req, res, next){
  try{
    var id = req.params.id;

    const client = new MongoClient(databaseLink);
    const database = client.db('coffee');
    const collection = database.collection('users');
    const user = await collection.findOne({
      _id: new mongo.ObjectId(id)
    })

    res.json({email:user.email})
  }catch{
    res.status(500).json({error:"Cannot find user"})
  }
});

//localhost:3000/users - POST
router.post('/', async function(req,res,next){
  try{
    const client = new MongoClient(databaseLink);
    const database = client.db('coffee');
    const collection = database.collection('users');

    var email = req.body.email;
    var password = req.body.password;

    var hashed_password = CrpytoJS.SHA512(password).toString();

    var email_check = await collection.countDocuments({
      email:email
    });

    if(email_check!=0){
      res.status(500).json({error:"Email already exists"})
    }else{
      var result = await collection.insertOne({
        email:email,
        password:hashed_password,
        staff:false
      })

      res.json({cookie:result.insertedId.toString()})
    }
    client.close();
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Cannot create user"})
  }  
});

//locahost:3000/users/login - POST
router.post('/login', async function(req,res,next){
  try{
    const client = new MongoClient(databaseLink);
    const database = client.db('coffee');
    const collection = database.collection('users');

    var email = req.body.email;
    var password = req.body.password;

    var hashed_password = CrpytoJS.SHA512(password).toString();

    var numUsers = await collection.countDocuments({
      email:email,
      password:hashed_password
    })

    if(numUsers === 1){
      var user = await collection.findOne({
        email:email,
        password:hashed_password
      })

      res.json({cookie:user._id})

      client.close();

    }else{
      res.status(500).json({error:"Email or password are not correct, please try again!"})
    }
  }catch{
    res.status(500).json({error:"Could not sign in, error occored"})
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
