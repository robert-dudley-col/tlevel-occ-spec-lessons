var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");
var functions = require('./functions');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', async function(req, res, next) {
  
  if(!await functions.CheckToken(req.cookies.token))
  {
    res.redirect('/login');
  }else{
    //connect to the database
    const client = new MongoClient(uri);

    //select the database on the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("posts");

    //find will get the whole contents of the database
    //.toArray() converts this to an array so we can use it easily
    const posts = await collection.find().toArray();

    //return a repsonse with the index page
    //pass it through the posts that we found
    res.render('index', { posts: posts});
  }
  
});

module.exports = router;
