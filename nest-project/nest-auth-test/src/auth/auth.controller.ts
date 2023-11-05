import { Body, Controller, Post, Request, Response } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    async register(@Body() userDto: CreateUserDto){
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res){
        console.log(req.body)
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );
        
        if(userInfo){
            res.cookie('login', JSON.stringify(userInfo)),{
                httpOnly: false,
                maxAge: 1000*660*60*24*7
            }
        }
        return res.send({message: 'login success'})
    }
}
