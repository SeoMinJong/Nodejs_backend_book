import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';

console.log(`${process.cwd()}/envs/${process.env.NODE_ENV}.env`)
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}입니다.`)

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:`${process.cwd()}/envs/${process.env.NODE_ENV}.env`
  }), 
    WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
