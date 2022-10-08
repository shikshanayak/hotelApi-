import { Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/create-room.dto';
import { Rooms } from './rooms.entity';
export declare class RoomsService {
    private readonly roomsRepo;
    constructor(roomsRepo: Repository<Rooms>);
    addRoom(createRoomDto: CreateRoomDto, user: any): Promise<Rooms>;
    updateRoom(id: number, data: Partial<Rooms>, user: any): Promise<Rooms>;
    deleteRoom(id: number): Promise<Rooms>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
