import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: '60m'
        }
    })],
    providers: [UserService],

    controllers: [UserController]
})
export class UserModule { }
