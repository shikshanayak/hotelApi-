import { Rooms } from "src/rooms/rooms.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    isAdmin: Boolean;
    rooms: Rooms[];
}
