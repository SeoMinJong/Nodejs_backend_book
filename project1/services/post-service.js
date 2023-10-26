const paginator = require("../utils/paginator");
const { ObjectId } = require("mongodb");

async function list(collection, page, search){
    const perPage = 10;
    query = {title:new RegExp(search, "i")};
    const cursor = await collection.find(query, {limit:perPage, skip: (page - 1)*perPage}).sort({createdDt:-1});
    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();

    const paginatorObj = paginator({totalCount, page, perPage: perPage});

    return [posts, paginatorObj]
}

async function writePost(collection, post){
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    console.log(post)
    return await collection.insertOne(post);
}

const projectOption = {
    projection:{
        password: 0,
        "comments.password":0
    }
}

async function getDetailPost(collection, id){
    return await collection.findOneAndUpdate({_id:ObjectId(id)},{$inc: { hits:1 }}, projectOption);
}

async function getPostByIdAndPassword(collection, {id, password}){
    return await collection.findOne({_id: ObjectId(id), password: password}, projectOption);
}

async function getPostById(collection, id){
    return await collection.findOne({_id:ObjectId(id)}, projectOption);
}

async function updatePost(collection, id, post){
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    
    return await collection.updateOne({_id:ObjectId(id)}, toUpdatePost)
}

module.exports = {
    list,
    writePost,
    getDetailPost,
    getPostById,
    getPostByIdAndPassword,
    updatePost,
}