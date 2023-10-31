import { Injectable } from "@nestjs/common";
import {PostDto} from './blog.model';
import { BlogFileRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private blogFileRepository: BlogFileRepository){}

  async getAllPosts(){
    return await this.blogFileRepository.getAllPost();
  }

  createPost(postDto: PostDto){
    this.blogFileRepository.createPost(postDto);
  }

  async getPost(id){
    return await this.blogFileRepository.getPost(id)
  }

  deletePost(id){
    this.blogFileRepository.deletePost(id)
  }

  updatePost(id, postDto: PostDto){
    this.blogFileRepository.updatePost(id, postDto)
  }
}