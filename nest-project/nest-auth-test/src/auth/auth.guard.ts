import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate{
    constructor(private authService: AuthService){}

    async canActivate(context: any): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        console.log('LoginGuard req :',req)

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

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    async canActivate(context: any): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const req = context.switchToHttp().getRequest();
        await super.logIn(req);

        return result;
    }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
}

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google'){
    async conActivate(context: any): Promise<boolean>{
        const result = (await super.canActivate(context)) as boolean
        const req = context.switchToHttp().getRequest();

        return result
    }
}