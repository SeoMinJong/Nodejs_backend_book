import { IsEmail, IsString } from 'class-validator'

export class CreateUserDto{
    @IsEmail()
    email:String;

    @IsString()
    password:String;

    @IsString()
    username:String;
}

export class UpdateUserDto{
    @IsString()
    password:String;

    @IsString()
    username:String;
}