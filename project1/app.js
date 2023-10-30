import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import {lengthOfList, eq, dateString} from './config/handlebars-helpers.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.engine("hbs", handlebars.create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        lengthOfList, 
        eq, 
        dateString,
    }
}).engine
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname + '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


import {mongodbConnection} from './config/mongodb-connection.js';
import * as postService from './services/post-service.js';

let collection;

app.get("/", async (req, res)=>{
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        const [posts, paginator] = await postService.list(collection, page, search);

        await res.render("home", {title:"test notice board", search, paginator, posts});
    }
    catch(err){
        res.render("home", {title:"test notice board"});
        console.log(err);
    }
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

app.delete("/delete", async (req, res)=>{
    try{
        const {id, password} = req.body;

        const result = await postService.deleteContent(collection, {id, password})
        
        if(result.acknowledged){
            return res.json({ isSuccess : true})
        }else{
            return res.json({ isSuccess : false })
        }
    }catch(err){
        console.log(err)
        return res.json({ isSuccess : false})
    }
    
})

app.post("/write-comment", async (req, res)=>{
    const { id, name, password, comment } = req.body;
    const post = await postService.getPostById(collection, id);

    if (post.comments){
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toString(),
        });
    }else{
        post.comments=[{
            idx:1,
            name,
            password,
            comment,
            createdDt: new Date().toString(),
        }]
    }
    
    await postService.updatePost(collection, id, post);
    return res.redirect(`detail/${id}`);
})

app.delete("/delete-comment", async  (req, res)=>{
    const {id, idx, password} = req.body;

    const post = await postService.deleteComment(collection, {id, idx, password});

    if(!post){
        return res.json({isSuccess:false}) 
    }

    post.comments = post.comments.filter((comment => comment.idx != idx));
    postService.updatePost(collection, id, post);

    return res.json({isSuccess:true});
})

app.listen(3000, async()=>{
    console.log("Server Started");
    const mongodbClient = await mongodbConnection();
    collection = mongodbClient.db().collection("post");
    console.log("MongoDB Connection");
});