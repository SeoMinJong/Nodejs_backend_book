import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises"; // await를 사용하여 Promise객체를 출력해야 하기 때문에 fs/promise 모듈로 접근해야한다.
import { PostDto } from "./blog.model";

export interface BlogRepogistory{
    getAllPost():Promise<PostDto[]>;
    createPost(postDto:PostDto);
    getPost(id: String):Promise<PostDto>;
    deletePost(id: String);
    updatePost(id: String, postDto:PostDto);
}

@Injectable()
export class BlogFileRepository implements BlogRepogistory{
    FILE_NAME = './src/blog.data.json';

    async getAllPost(): Promise<PostDto[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);

        return posts
    }

    async createPost(postDto: PostDto) {
        const posts = await this.getAllPost();
        let id;
        if(posts.length <= 0){
            id=1
        }else{
            const post = posts[posts.length-1]
            id = post.id + 1;
        }   
        const createPost = {id, ...postDto, CreatedDt : new Date()}
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    async getPost(id: String): Promise<PostDto> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => (id===id));

        return result
    }

    async deletePost(id: String) {
        const posts = await this.getAllPost();
         // posts 내부 객체의 id는 Number, 매개변수 id String이기 때문에 비교다 !=를 사용함
        const filterPosts = posts.filter((post)=>(post.id!=id));
        await writeFile(this.FILE_NAME, JSON.stringify(filterPosts));
    }

    async updatePost(id: String, postDto: PostDto) {
        let posts = await this.getAllPost();
        const index = posts.findIndex((post)=>(post.id===id));
        const updatePost = {id, ...postDto, updatedDt:new Date()}
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }
}