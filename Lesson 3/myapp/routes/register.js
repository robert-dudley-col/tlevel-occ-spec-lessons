var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");
var CryptoJS = require('crypto-js');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('register');
});

router.post('/', async function(req, res, next){
  //declare the mongodb variables an
  const client = new MongoClient(uri);
  const database = client.db("forum");
  const collection = database.collection("users");

  //grab the email and passwords from the requests body
  //hash the passwords
  var email = req.body.email;
  var password = CryptoJS.SHA512(req.body.password).toString();
  var password_check = CryptoJS.SHA512(req.body.password_check).toString();

  //if password hashes don't match
  if(password!=password_check){
    //load register page, give message saying passwords don't match
    res.render('register',{message:"Passwords do not match"})
  }else{
    //count number of documents with email provided
    var email_check = await collection.countDocuments({
      email:email
    })
    //if there email check gives back not 0
    //i.e. email appears in db
    if(email_check!=0)
    {
      //load register page and give message that email exists
      res.render('register',{message:"Email already exists"})
    }else{
      //register user account
      await collection.insertOne({
        email:email,
        password:password
      })
      //redirect to login page
      res.redirect('/login');
    }
  }
  client.close();
});

module.exports = router;
