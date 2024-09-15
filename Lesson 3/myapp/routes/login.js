var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");
var CryptoJS = require('crypto-js');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', async function(req, res, next) {
    if(req.query.loginFailed)
    {
        var message = "Login Failed"
    }else{
        var message = ""
    }
    res.render('login',{message:message});
});

router.post('/', async function(req,res,next){
    //connect to the database
    const client = new MongoClient(uri);

    //select the database on the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("users");

    //get the new users email and password from the requests body
    var email = req.body.email;
    var password = CryptoJS.SHA512(req.body.password).toString();

    //query the database for the number of users with matching information
    var numUsers = await collection.countDocuments({
        email:email,
        password:password
    })
    
    //check that there's only one user
    if(numUsers === 1)
    {
        //get the details about the correct user
        var user = await collection.findOne({
            email:email,
            password:password
        })
        //add their ID to a token
        res.cookie('token',user._id)
        //send them to the home page
        res.redirect('/')
    }else{
        //login failed, send them back to login
        // set login failed flag to True
        res.redirect('/login?loginFailed=True')
    }
    
})

module.exports = router;
