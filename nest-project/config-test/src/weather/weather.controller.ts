import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'

@Controller('weather')
export class WeatherController {
    constructor (private configService:ConfigService){}

    @Get()
    public getWeather():string{
        const apiUrl = this.configService.get('WEATHER_API_URL');
        const apiKey = this.configService.get('WEATHER_API_KEY');

        return this.callWeatherApi(apiUrl, apiKey)
    }

    private callWeatherApi(url:string, key:string):string{
        console.log('weather api start');
        console.log(url);
        console.log(key)
        return '맑음'
    }

}
