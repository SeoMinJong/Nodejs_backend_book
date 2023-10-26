const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

app.engine('hbs', handlebars.engine);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongodbConnection = require("./config/mongodb-connection");
const postService = require("./services/post-service");

let collection;

app.get("/", async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        const [posts, paginator] = await postService.list(collection, page, search);

        res.render("home", {title:"test notice board", search, paginator, posts});
    }
    catch(err){
        console.log(err);
    }
    res.render("home", { title : "test notice board"});
});

app.get("/write", (req, res)=>{
    res.render("write", {title: "테스트 게시판", mode: "create"});
})

app.get("/modify/:id", async (req, res)=>{
    const id = req.params.id;
    const post = await postService.getPostById(collection, id);
    res.render("write", {title:"테스트 게시판", mode:"modify", post: post})
})

app.post("/modify", async (req, res)=>{
    const {id, title, name, password, content} = req.body;

    const post = {
        title,
        name,
        password,
        content,
        createdDt: new Date().toString(),
    }

    const result = postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
})

app.post("/write", async (req, res)=>{
    const post = req.body;
    const result = await postService.writePost(collection, post);
    res.redirect(`detail/${result.insertedId}`);
})

app.get("/detail/:id", async (req, res)=>{
    const result = await postService.getDetailPost(collection, req.params.id)
    res.render("detail", {title: "타이틀", post: result.value})
})

app.post("/check-password", async (req, res)=>{
    const {id, password} = req.body;

    const post = await postService.getPostByIdAndPassword(collection, {id, password});

    if (!post){
        return res.status(404).json({ isExist: false });
    }else{
        return res.json({ isExist: true });
    }
})

app.listen(3000, async()=>{
    console.log("Server Started");
    const mongodbClient = await mongodbConnection();

    collection = mongodbClient.db().collection("post");
    let a = await collection.count({title:new RegExp("", "i")});
    console.log(a)
    console.log("MongoDB Connection");
});