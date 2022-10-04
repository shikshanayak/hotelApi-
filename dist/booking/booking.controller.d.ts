import { BookingService } from './booking.service';
export declare class BookingController {
    private readonly service;
    constructor(service: BookingService);
    bookRoomByUser(body: any): Promise<import("./booking.entity").Booking>;
    cancelRoom(id: string): void;
}
