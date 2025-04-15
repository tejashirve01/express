const express = require("express");
const app = express();
const port = 3000;

function userMiddleware(req, res,next ){
    if(username != 'Tejas' || password != 'Hirve'){
        res.status(403).json({
            msg:"User doesn't exists",
        });
    }
    else{
        next();
    }
};

function kidneyMiddleware(req,res, next){
    if(kidneyId != 1 && kidneyId != 2){
        res.status(411).json({
            msg : "Wrong inputs",
        });
    }
    else{
      next();  
    }
};
app.get('/health-checkup', userMiddleware, kidneyMiddleware, function(req,res){
    const kidneyId = req.query.kidneyId;
    const username = req.headers.username;
    const password = req.headers.password;
    res.send("Your heart is healthy");
});

app.listen(port);
