const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
mongoose.connect('mongodb+srv://tejashirve:tejashirve@cluster0.a7ews.mongodb.net/');

const User = mongoose.model('Users', { name: String, email : String, password : String });

app.post("/signup", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existUser = await User.findOne({email : username})

    if(existUser){
        return res.status(400).send("User already exists")
    }

    const objs = new User({ name : name, email : username, password : password});
    
    objs.save()
    res.json({
        "msg" : "User created successfully"
    })

})

app.listen(3000)