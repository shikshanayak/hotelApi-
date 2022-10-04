import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Post('/signup')
    signup(@Body() body: CreateUserDto){
        return this.usersService.signup(body.email, body.password)
    }

    @Post('/signin')
    signin(@Body() body: any){
        const {email, password} = body;
        return this.usersService.signin(email,password);
    }

    @Patch('/id')
    updateUser(@Param('/id') id: string, @Body() body: CreateUserDto){
        return this.usersService.UpdateUser(parseInt(id), body)
    }

    @Delete('/id')
    deteleUserById(@Param('/id') id: string){
        return this.usersService.deleteUserById(parseInt(id))
    }

    @Delete()
    deleteAll(){
        return this.usersService.deleteAll()
    }

}
