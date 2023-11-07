import { CanActivate, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private authService: AuthService){}

    async canActivate(context: any): Promise<boolean>{
        const req = context.switchToHttp().getRequest();

        if(req.cookies['login']){
            return true
        }
        if(!req.body.email || !req.body.password){
            return true
        }


        const user = await this.authService.validateUser(
            req.body.email,
            req.body.password
        )

        if(!user){
            return false
        }

        req.user = user;
        return true
    }
}