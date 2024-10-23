import { IsEmail, IsString } from "class-validator";

export class SignUpDTO {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}