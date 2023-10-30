const express = require("express");
const url = require("url");
const app = express();
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Start SERVER : use ${PORT}`);
});

app.get("/", (_,res)=>{res.end("HOME")});

app.get("/user", user);
app.get("/feed", feed);

function user(req, res){
    const user = url.parse(req.url).query;

    res.json(`[user] name : ${user.name}, age : ${user.age}`);
};

function feed(req, res){
    res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `);
};