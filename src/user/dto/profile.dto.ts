import { IsEmail, IsEmpty, IsString, isString } from "class-validator";

export class ProfileDTO {

    email: string;
    firstName?: string;
    lastName?: string;

}