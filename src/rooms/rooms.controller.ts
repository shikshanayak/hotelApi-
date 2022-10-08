import { Controller, Post , Body, Patch, Param, Get, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomsService } from './rooms.service';

@UseGuards(AdminGuard)
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomservice: RoomsService){};

    @Post('addroom')
    @UseInterceptors(ClassSerializerInterceptor)
    addRoom(@Request() req: any,@Body() body: CreateRoomDto){
        const user =  req.user; 
        return this.roomservice.addRoom(body, user);
    }
    
    // @Get('getallrooms')
    // getRooms(@Request() req: any){
        
    //     return this.roomservice.getrooms();
    // }

    @Patch('/:id')
    updateRoom(@Param('id') id: string, @Body() body: any,@Request() req: any,){
        const user =  req.user; 
        return this.roomservice.updateRoom(parseInt(id), body, user)
    }

    @Delete('/:id')
    deleteroom(@Param('id') id: string){
        return this.roomservice.deleteRoom(parseInt(id))
    }

    @Delete()
    deleteAll(){
        return this.roomservice.deleteAll()
    }
}


// const userId = req.user.sub
 // const user = {
        //     ...body,
        //     userId
        // } if(!index) throw new BadRequestException("user with this email not found"); 
        // @Request() req: any
        // const user = req.user.IsAvailable;
        // console.log(user);