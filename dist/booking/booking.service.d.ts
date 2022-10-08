import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Rooms } from 'src/rooms/rooms.entity';
import { User } from 'src/user/user.entity';
export declare class BookingService {
    private readonly bookingrepo;
    private readonly userrepo;
    private readonly roomrepo;
    constructor(bookingrepo: Repository<Booking>, userrepo: Repository<User>, roomrepo: Repository<Rooms>);
    bookRoomByUser(roomno: number, user: any): Promise<Booking>;
    getHistoryByUser(user: any): Promise<Booking[]>;
    getAllrooms(user: any): Promise<Booking[]>;
    checkout(user: any): Promise<Booking>;
}
