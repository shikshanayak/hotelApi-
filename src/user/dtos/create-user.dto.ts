import { IsEmail , IsString, IsNotEmpty, IsOptional} from "class-validator";



export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}