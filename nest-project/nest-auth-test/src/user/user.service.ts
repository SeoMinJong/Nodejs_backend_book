import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)private userRepository:Repository<User>,
    ){}

    async getUser(email) {
        const result = await this.userRepository.findOne({
            where: {
                email: email,
            },
        })
        return result 
    }

    async createUser(user) {
        return await this.userRepository.save(user)
    }

    async updateUser(email, user) {
        const tg_user: User = await this.getUser(email);
        console.log('update user :', user)

        tg_user.username = user.username;
        tg_user.password = user.password;
        console.log(tg_user);
        this.userRepository.save(tg_user);
    }
    
    async deleteUser(email) {
        return await this.userRepository.delete({email})
    }
}
