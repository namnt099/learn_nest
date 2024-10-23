import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

import { SignInDTO } from "./dto/signin.dto";
import { SignUpDTO } from "./dto/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() req: SignUpDTO) {

        return this.authService.signup(req);
    }
    @Post('signin')
    signin(@Body() req: SignInDTO) {
        console.log(req);
        return this.authService.signin(req);
    }

}