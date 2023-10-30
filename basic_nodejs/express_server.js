const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res)=>{
    res.set({"Content-Type":"text/html; charset=utf-8"});
    res.end("헬로 express");
});

app.listen(PORT, ()=>{
    console.log(`Start SERVER : use ${PORT}`);
});