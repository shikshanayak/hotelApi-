import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly service;
    private readonly userService;
    constructor(service: BookingService, userService: Repository<User>);
    bookRoomByUser(body: any, req: any): Promise<import("./booking.entity").Booking>;
    getAllrooms(req: any): Promise<import("./booking.entity").Booking[]>;
    checkout(req: any): Promise<import("./booking.entity").Booking>;
}
