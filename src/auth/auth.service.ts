import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import *  as argon2 from "@node-rs/argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SignInDTO } from "./dto/signin.dto";
import { JwtService } from "@nestjs/jwt";
import { SignUpDTO } from "./dto/signup.dto";

@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService, private jwtService: JwtService) { }

    async signup(body: SignUpDTO) {
        try {
            const hash = await argon2.hash(body.password)
            const user = await this.prismaService.user.create({
                data: {
                    email: body.email,
                    hash: hash
                },

            })
            delete user.hash
            return user

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error
        }
    }
    async signin(body: SignInDTO) {
        const user = await this.prismaService.user.findUnique(
            {
                where: {
                    email: body.email
                }
            }
        )
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const authorized = await argon2.verify(user.hash, body.password)

        if (!authorized) {
            throw new UnauthorizedException('Password incorrect')
        }
        const payload = { sub: user.id, user: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

    }
}