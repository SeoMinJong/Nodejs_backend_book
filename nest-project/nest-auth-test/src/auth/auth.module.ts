import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.straetgy';

@Module({
  imports: [UserModule, PassportModule.register({ session:true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy]
})
export class AuthModule {}
