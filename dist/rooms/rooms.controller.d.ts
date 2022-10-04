import { CreateRoomDto } from './dtos/create-room.dto';
import { RoomsService } from './rooms.service';
export declare class RoomsController {
    private readonly roomservice;
    constructor(roomservice: RoomsService);
    addRoom(req: any, body: CreateRoomDto): Promise<import("./rooms.entity").Rooms>;
    getRooms(): Promise<import("./rooms.entity").Rooms[]>;
    updateRoom(id: string, body: any): Promise<import("./rooms.entity").Rooms>;
    deleteroom(id: string): Promise<import("./rooms.entity").Rooms>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
