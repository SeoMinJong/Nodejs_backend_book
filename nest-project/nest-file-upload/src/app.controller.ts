import { Controller, Get, Post, UploadedFile, UseInterceptors, Request } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import * as multer from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('file-upload')
  @UseInterceptors(FileInterceptor('file'))
  fileUpload(@UploadedFile() file:Express.Multer.File){
    console.log(file.buffer.toString('utf-8'  ))
 
    return 'File Upload success';
  }
}
