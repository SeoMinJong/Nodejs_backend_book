const http = require("http");
const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type","text/html");
    res.end("OK")
}).listen(8000)

// server.listen(8000);