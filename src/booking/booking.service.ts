import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {BadRequestException} from '@nestjs/common'
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
    constructor(@InjectRepository(Booking) private readonly bookingrepo: Repository<Booking>
    
    ){}

    async bookRoomByUser(roomno: number){
        const existingRoom =  await this.bookingrepo.findOne({where: {roomno}})
        if(existingRoom) throw new BadRequestException('room no already exist')
        const roonno = await this.bookingrepo.create({roomno});
        console.log(roonno);
        
        return this.bookingrepo.save(roonno)
    }

    async cancelRoom(roomno: number){
        const existingroom  = this.bookingrepo.findOne({where: {roomno}});

        const index = await this.bookingrepo.findOne({where: {roomno}});
        if(!index) throw new BadRequestException("room with id is not present")
        
    }
}
