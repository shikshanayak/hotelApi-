import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {BadRequestException, NotFoundException} from '@nestjs/common'
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Rooms } from 'src/rooms/rooms.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class BookingService {
    constructor(@InjectRepository(Booking) private readonly bookingrepo: Repository<Booking>,
    @InjectRepository(User) private readonly userrepo: Repository<User>,
    @InjectRepository(Rooms) private readonly roomrepo: Repository<Rooms>

    ){}

    async bookRoomByUser(roomno: number, user){
        const existingRoom =  await this.roomrepo.findOne({where: {roomno}}); 
        if(!existingRoom) throw new BadRequestException("room is not added by admin")
        // const existingbooking = await this.bookingrepo.findOne({where: {roomno}});
        // console.log(existingbooking);
        
        // if(existingbooking) throw new BadRequestException('room booked already ');
        const roomnonew =  this.bookingrepo.create({roomno});
        roomnonew.user = user;
        roomnonew.status = "booked";
        existingRoom.IsAvailable = "booked";
        return this.bookingrepo.save(roomnonew)
    }

    // async getHistoryByUser(user){  
    //     const existingAllbooking = await this.bookingrepo.find({where: {user: user}});
    //     console.log(existingAllbooking);
    //     if(!existingAllbooking) throw new BadRequestException('room no with this id not booked ');
    //     return existingAllbooking;
    // }

    async getAllAvailablerooms(user){
        const availableRoom = await this.roomrepo.find({where: {user: user}});
        if(!availableRoom) throw new BadRequestException("all rooms are booked");
       return this.bookingrepo.find();
    }
   

    async checkout( user){
        const existingbooking  = await this.bookingrepo.findOne({where: {user: user, status: "booked"}});
        console.log(existingbooking);
        if(!existingbooking) throw new NotFoundException("this booking not found");
        existingbooking.status = "checked out";
        const existingroom = await this.roomrepo.findOne({where: {user : user}});
        console.log(existingroom);
        
        if(!existingroom) throw new NotFoundException("room not not exist");
        existingroom.IsAvailable = "available";
        this.roomrepo.save(existingroom);
        return this.bookingrepo.save(existingbooking);
        
        // return existingbooking;
    }

    // async cancelRoom(id: number){
    //     const existingBOOKING = await this.bookingrepo.findOne({where: {id}});
    //     if(!existingBOOKING) throw new NotFoundException("room no not found");
    
    //     existingBOOKING.status = "available";

    // }


   
}
// const index = await this.bookingrepo.findOne({where: {roomno}});
// if(!index) throw new BadRequestException("room with id is not present")
// async checkin(id: number){
//     const existingroom  = await this.roomsService.findOne({where: {id}});
//     if(existingroom) throw new NotFoundException("room no not found");

// }

// const existingroom  = await this.bookingrepo.findOne({where: {id}});
        // console.log("existingroom",existingroom);
        
        // if(!existingroom) throw new NotFoundException("room no not found");
        // const existingUser = await this.userrepo.findOne({where: {id}});