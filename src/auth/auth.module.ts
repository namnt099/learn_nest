import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: '1d',
        }
    })], controllers: [AuthController], providers: [AuthService],
})
export class AuthModule {


}