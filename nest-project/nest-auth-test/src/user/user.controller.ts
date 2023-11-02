import { Body, Controller, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get('/getUser/:email')
    async getUser(@Param('email') email: string){
        const user = this.userService.getUser(email)
        console.log('search email :', email)

        return user 
    }

    @Post('/createUser')
    createUser(@Body() user:User){
        return this.userService.createUser(user);
    }

    @Put('/updateUser/:email')
    updateUser(@Param('email') email:string, @Body() user:User){
        console.log('update email :', email)

        return this.userService.updateUser(email, user)
    }

    @Delete('deleteUser/:email')
    deleteUser(@Param('email') email:string){
        console.log('delete email :', email)

        return this.userService.deleteUser(email)
    }
}
