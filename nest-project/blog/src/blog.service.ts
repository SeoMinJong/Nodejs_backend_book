import { Injectable } from "@nestjs/common";
import {PostDto} from './blog.model';
// import { BlogFileRepository } from './blog.repository';
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
  // constructor(private blogRepository: BlogRepository){}
  constructor(private blogRepository: BlogMongoRepository){}

  async getAllPosts(){
    return await this.blogRepository.getAllPost();
  }

  createPost(postDto: PostDto){
    this.blogRepository.createPost(postDto);
  }

  async getPost(id){
    return await this.blogRepository.getPost(id)
  }

  deletePost(id){
    this.blogRepository.deletePost(id)
  }

  updatePost(id, postDto: PostDto){
    this.blogRepository.updatePost(id, postDto)
  }
}