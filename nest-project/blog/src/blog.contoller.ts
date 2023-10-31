import { Controller, Param, Body, Delete, Get, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogContoller{
  // constructor는 class에서 인스턴스를 초기화하고 생성할 수 있는 함수로 this로 BlogService(자신)을 참조하여 blogService 객체를 생성할 수 있게 한다.
  constructor(private blogService: BlogService){}
  
  @Get()
  async getAllPosts(){
    console.log("all post get");
    return await this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() post:any){
    console.log('post create');
    this.blogService.createPost(post);
    
    return 'sueccss'
  }

  @Get('/:id')
  async getPost(@Param('id') id:string){
    console.log('get post');

    return await this.blogService.getPost(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id:String){
    console.log('delete post');
    this.blogService.deletePost(id);

    return 'sueccss'
  }

  @Put('/:id')
  updatePost(@Param('id') id, @Body() post:any){
    console.log(`${id} post update`);
    console.log(post)

    return this.blogService.updatePost(id, post);
  }
}