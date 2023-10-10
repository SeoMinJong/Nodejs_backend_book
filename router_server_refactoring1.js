const http = require("http");
const url = require("url");

const server = http.createServer((req, res) =>{
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    if(path in urlMap){
        urlMap[path](req, res)
    }else{
        notFound(req, res)
    }

}).listen(8000, ()=> console.log("라우터 정상 작동중"))

const user = (req, res)=>{
    let userInfo = url.parse(req.url, true).query;
    if (userInfo.name!=undefined || userInfo.age!=undefined){
        res.end(`[USER] name : ${userInfo.name} / age : ${userInfo.age}`)
    }else{
        notFound(req, res)
    }
    
}

const feed = (req, res)=>{
    res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `);
};

const notFound = (req, res)=>{
    res.statusCode = 404;
    res.end("404 page not found");
};

const urlMap = {
    "/":(req, res)=>res.end("HOME"),
    "/user":user,
    "/feed":feed
};

