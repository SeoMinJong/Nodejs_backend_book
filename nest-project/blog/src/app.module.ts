import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogContoller } from './blog.contoller';
import { BlogService } from './blog.service';
import { BlogMongoRepository } from './blog.repository';
import { Blog, BlogSchema } from './blog.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.blog.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('ID')}:${configService.get<string>('PASSWORD')}@cluster0.ei1qrjr.mongodb.net/`,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogContoller],
  providers: [BlogService, BlogMongoRepository],
})
export class AppModule {}