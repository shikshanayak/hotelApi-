import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
export declare class BookingService {
    private readonly bookingrepo;
    constructor(bookingrepo: Repository<Booking>);
    bookRoomByUser(roomno: number): Promise<Booking>;
    cancelRoom(roomno: number): Promise<void>;
}
