import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'nest-auth-test.sqlite',
      entities:[User],
      synchronize:true,
      logging:true,
    }),
    ConfigModule.forRoot(),
    UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
