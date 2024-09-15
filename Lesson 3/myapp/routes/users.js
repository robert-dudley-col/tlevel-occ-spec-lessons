var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
var functions = require('./functions');
var mongo = require('mongodb');
var CryptoJS = require('crypto-js');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(!await functions.CheckToken(req.cookies.token))
  {
    res.redirect('/login');
  }else{
    const client = new MongoClient(uri);
    const database = client.db("forum");
    const collection = database.collection("users");
    const users = await collection.find().toArray();
    res.render('users', { users: users});
    client.close();
  }
});

router.get('/:id/password', async function(req, res, next) {
  id = req.params.id
  if(!await functions.CheckToken(req.cookies.token))
  {
    res.redirect('/login');
  }else{
    res.render('password', { id: id});
  }
});

router.post('/:id/password', async function(req, res, next) {
  if(!await functions.CheckToken(req.cookies.token))
  {
    res.redirect('/login');
  }else{
    id = req.params.id
    var password = CryptoJS.SHA512(req.body.password).toString();
    var password_check = CryptoJS.SHA512(req.body.password_check).toString();
    if(password==password_check){
      const client = new MongoClient(uri);
      const database = client.db("forum");
      const collection = database.collection("users");
      await collection.updateOne({_id: new mongo.ObjectId(id)},{'$set':{password:password}})
      client.close();
      res.redirect('/users');
    }else{
      res.render('password', { id: id, message:"Password Not Correct"});
    }   
  }
});

module.exports = router;
