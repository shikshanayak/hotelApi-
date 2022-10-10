import { Controller, Post ,Body, Get, Patch, Param, Delete, UseGuards, Request, ClassSerializerInterceptor, UseInterceptors} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { BookingService } from './booking.service';



@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('booking')
export class BookingController {
    constructor(private readonly service : BookingService, 
        @InjectRepository(User) private readonly userService: Repository<User>){}

    
    @Post('/bookroom')
    bookRoomByUser(@Body() body: any, @Request() req: any){     //working route
        console.log(req.user);
        const user = req.user;
        const { roomno } = body;
        return this.service.bookRoomByUser(parseInt(roomno), user);
    }

    
    // @Get('/:id')
    // getAllHistory( @Request() req: any){
    //     const user = req.user;
    //     return this.service.getHistoryByUser( user)
    // }

    @Get('/getallroomsbyuser')
    getAllrooms(@Request() req: any){
        const user = req.user.IsAvailable;
        return this.service.getAllAvailablerooms(user)
    }


   
    @Patch('/checkout/:id')

    checkout( @Request() req: any){
        const user = req.user;
        return this.service.checkout(user);
    }

    // @Delete('/:id')
    // cancelRoom(@Param('id') id: string){
    //     const index = this.service.cancelRoom(parseInt(id))
    //     return index;
    // }

}
