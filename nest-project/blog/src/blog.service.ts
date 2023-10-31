import {PostDto} from './blog.model';
import { BlogRepogistory, BlogFileRepository } from './blog.repository';

export class BlogService {
  blogFileRepository: BlogFileRepository;

  constructor(){
    this.blogFileRepository = new BlogFileRepository();
  }

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