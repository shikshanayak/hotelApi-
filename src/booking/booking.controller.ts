import { Controller, Post ,Body, Get, Patch, Param, Delete} from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly service: BookingService){}

    @Post('/bookroom')
    bookRoomByUser(@Body() body: any){
        const { roomno } = body
        return this.service.bookRoomByUser(parseInt(roomno))
    }

    @Delete('/:id')
    cancelRoom(@Param('id') id: string){
        const index = this.service.cancelRoom(parseInt(id))
    }

}
