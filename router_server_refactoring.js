const http = require("http");
const url = require("url");

const server = http.createServer((req, res) =>{
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if(path==="/user"){
        user(req, res)
    }else if(path === "/feed"){
    }else{
        feed(req, res)
    }

}).listen(8000, ()=> console.log("라우터 정상 작동중"))

const user = (req, res)=>{
    res.end("[USER] name : 앤디 / age : 30")
}

const feed = (req, res)=>{
    res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `)
}