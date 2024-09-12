var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('register');
});

router.post('/', async function(req, res, next){
    //connect to the database
    const client = new MongoClient(uri);

    //select the database on the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("users");
    
    //get the new users email and password from the requests body
    var email = req.body.email;
    var password = req.body.password;

    //insert a new user with the email and password
    await collection.insertOne({
        email:email,
        password:password
    })

    //redirect them to the login page so they can now login
    res.redirect('/login');
});

module.exports = router;
