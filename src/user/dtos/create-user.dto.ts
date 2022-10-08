import { IsEmail , IsString, IsNotEmpty, IsOptional, IsBoolean} from "class-validator";



export class CreateUserDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;
     
    @IsOptional()
    @IsBoolean()
    isAdmin : boolean;
}