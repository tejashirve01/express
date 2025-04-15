const express = require("express");
const app = express();
const PORT = 3000;

function sum(n){
    let a = 0;
    for(let i = 1; i<=n; i++){
        a = a + i;
    }
    return a;
}
app.get("/", function(req,res){
    const n = req.query.n;
    const total = sum(n);

    res.send("Sum of first" + n + "numbers is" + total);
})

app.listen(PORT);   