const express = require('express')
const jwt = require('jsonwebtoken')
const jwtpassword = "123456";
const app = express();
app.use(express.json());
const users = [
    {
        username: "Tejas Hirve",
        password: "123",
        firstname: "Tejas"
    },
    {
        username:"Vaibhavi Hirve",
        password: "123456",
        firstname:"Vaibhavi"
    },
    {
        username:"Wekuti Soman",
        password:"342142",
        firstname:"Wekuti"
    }
];

function userExists(username, password){

    var userExists = false;
    for (let i = 0; i < users.length; i++){
        if(users[i].username == username && users[i].password == password ){
            userExists = true;
        }
    }
    return userExists;
}

app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username,password)){
        return res.status(403).json({
            msg: "User doesnt exist"
        })
    }

    var token = jwt.sign({username: username}, password );
    return res.json({
        token,
    })
})


app.get("/users", function(req,res){
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtpassword);
    const username = decoded.username;
    res.json({
        user: users
    })

})

app.listen(3000);