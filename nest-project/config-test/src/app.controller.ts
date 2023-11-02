import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private configService: ConfigService){}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE')
    return message;
  }

  @Get('service-url')
  getUrl():string{
    const url = this.configService.get('SERICE_URL')
    console.log(url)
    return url
  }

  @Get('db-info')
  getDbIngo():String{
    console.log(this.configService.get('logLevel'));
    console.log(this.configService.get('apiVersion'));

    return this.configService.get('dbInfo');
  }
}
