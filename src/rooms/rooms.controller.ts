import { Controller, Post , Body, Patch, Param, Get, Delete, UseGuards, Request} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomsService } from './rooms.service';


@UseGuards(AuthGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomservice: RoomsService){}

    
    @Post('addroom')
    addRoom(@Request() req: any,@Body() body: CreateRoomDto){
        const user =  req.user   
        return this.roomservice.addRoom(body, user);
    }

    @Get('getallrooms')
    getRooms(){
        return this.roomservice.getrooms();
    }

    @Patch('/:id')
    updateRoom(@Param('id') id: string, @Body() body: any){
        return this.roomservice.updateRoom(parseInt(id), body)
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