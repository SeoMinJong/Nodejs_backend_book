import { Module } from '@nestjs/common';
import { BlogContoller } from './blog.contoller';
import { BlogService } from './blog.service';
import { BlogFileRepository } from './blog.repository';

@Module({
  imports: [],
  controllers: [BlogContoller],
  providers: [BlogService, BlogFileRepository],
})
export class AppModule {}