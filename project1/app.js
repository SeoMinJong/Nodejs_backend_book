const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const hbs = handlebars.create({
    helpers: require("./config/handlebars-helpers"),
});

app.engine('handlebars', hbs.engine);

app.set("view engine", "handlebars");
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
        console.log(posts)

        res.render("home", {title:"test notice board", search, paginator, posts});
    }
    catch(err){
        console.log(err);
    }
    res.render("home", { title : "test notice board"});
});

app.get("/write", (req, res)=>{
    res.render("write", {title: "테스트 게시판"})
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

app.listen(3000, async()=>{
    console.log("Server Started");
    const mongodbClient = await mongodbConnection();

    collection = mongodbClient.db().collection("post");
    console.log("MongoDB Connection");
});