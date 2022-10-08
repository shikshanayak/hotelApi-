import { Injectable , UnauthorizedException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Rooms } from './rooms.entity';

@Injectable()
export class RoomsService {

    constructor(@InjectRepository(Rooms) private readonly roomsRepo: Repository<Rooms>){}

    async addRoom(createRoomDto : CreateRoomDto, user){
            const exitingroom = await this.roomsRepo.findOne({where: {roomno: createRoomDto.roomno}});
        
            if(exitingroom) throw new BadRequestException("this room no already exist")
            const room =  this.roomsRepo.create(createRoomDto);
            room.user = user;
            console.log(room.user);
            
            room.IsAvailable = "available";
            
            return this.roomsRepo.save(room)
        
    }

//    async  getrooms(){
//         const availableRoom = await  this.roomsRepo.find({where: {IsAvailable: 'available'}})
//         console.log(availableRoom);
        
//         if(!availableRoom ) throw new BadRequestException("all rooms are booked")
//         return  availableRoom;
//     }
    
    
    async updateRoom(id: number, data: Partial<Rooms>, user){
        const index = await this.roomsRepo.findOne({where: {id}});
        
        console.log("index",index);
        
        if(!index) throw new BadRequestException("user with id not found");
        index.user = user;
        Object.assign(index, data)
        console.log(index);
        
        return this.roomsRepo.save(index )

    }
    
    async deleteRoom(id: number){
        const index = await this.roomsRepo.findOne({where: {id}});
        if(!index) throw new BadRequestException("user with id not found");
        return this.roomsRepo.remove(index)
    }
    async deleteAll(){
        return this.roomsRepo.delete({})
    }
}
// if (!user.isAdmin) throw new UnauthorizedException("admin is not true")
// const room =  await this.roomsRepo.create(createRoomDto);
//  room.user = user.sub
//   room.IsAvailable = false;
//  return this.roomsRepo.save(room)






// return this.roomsRepo.createQueryBuilder().post().set({
//     user: user.sub,
//     IsAvailable: true
// }).where({roomno: createRoomDto.roomno}).execute();