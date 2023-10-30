import paginator from "../utils/paginator.js";
import {createHashedPassword, verifyPassword} from "./password-module.js"
import { ObjectId } from "mongodb";

let query
export async function list(collection, page, search){
    const perPage = 10;
    query = {title:new RegExp(search, "i")};
    const cursor = await collection.find(query, {limit:perPage, skip: (page - 1)*perPage}).sort({createdDt:-1});
    const totalCount = await collection.count(query);
    const posts = await cursor.toArray();

    const paginatorObj = paginator({totalCount, page, perPage: perPage});

    return [posts, paginatorObj]
}

export async function writePost(collection, post){
    post.hits = 0;
    post.createdDt = new Date().toISOString();
    let hashed_pass = await createHashedPassword(post.password)
    post.password = hashed_pass.hashedPassword
    post.salt = hashed_pass.salt
    return await collection.insertOne(post);
}

const projectOption = {
    projection:{
        password: 0,
        "comments.password":0
    }
}

export async function getDetailPost(collection, id){
    return await collection.findOneAndUpdate({_id:ObjectId(id)},{$inc: { hits:1 }}, projectOption);
}

export async function getPostByIdAndPassword(collection, {id, password}){
    const find_salt_password = await getPassword(collection, id, password)
    const isCheckPass = await verifyPassword(password, find_salt_password.salt, find_salt_password.password)

    if(isCheckPass){
        return await collection.findOne({_id: ObjectId(id), password: find_salt_password.password}, projectOption);
    }else{
        alert("비밀번호를 확인해주세요")
    }
    
}

export async function getPostById(collection, id){
    return await collection.findOne({_id:ObjectId(id)}, projectOption);
}

export async function updatePost(collection, id, post){
    const toUpdatePost = {
        $set: {
            ...post,
        },
    };
    
    return await collection.updateOne({_id:ObjectId(id)}, toUpdatePost)
}

export async function deleteContent(collection, post){
    const {id, password} = post;
    const {encodingPass, _} = await getPassword(collection, id, password);

    return await collection.deleteOne({_id:ObjectId(id), encodingPass})
}

export async function deleteComment(collection, post){
    const {id, idx, password} = post;
    console.log('start db find')
    const result = await collection.findOne({_id:ObjectId(id), 
        comments: {$elemMatch: {idx:parseInt(idx), password:password}}}
        ,projectOption);
    return result
}

async function getPassword(collection, id, password){
    // password 복호화
    const find_salt_password = await collection.findOne({_id: ObjectId(id)}, {salt:1, password:1})

    return find_salt_password
}