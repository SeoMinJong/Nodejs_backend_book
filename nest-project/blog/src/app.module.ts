import { Module } from '@nestjs/common';
import { BlogContoller } from './blog.contoller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogContoller],
  providers: [BlogService],
})
export class AppModule {}