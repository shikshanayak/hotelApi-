import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Post('/signup')
    
    signup(@Body() body: CreateUserDto){
        console.log(body);
        const {email, password, isAdmin} = body;
        // const isAdmin = isadmin === true ? true : false;
        return this.usersService.signup(email, password, isAdmin);
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
