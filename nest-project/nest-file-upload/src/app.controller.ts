import { Controller, Get, Post, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './multer.options';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file', multerOption))
  fileUpload(@UploadedFile() file:Express.Multer.File){
    console.log(file);
 
    return 'File Upload success';
  }
}
