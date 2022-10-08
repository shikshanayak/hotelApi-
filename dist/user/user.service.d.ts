import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Rooms } from 'src/rooms/rooms.entity';
export declare class UserService {
    private readonly repo;
    private readonly roomsrepo;
    constructor(repo: Repository<User>, roomsrepo: Repository<Rooms>);
    private hashPassword;
    private comparepassword;
    signup(email: string, password: string, isAdmin: boolean): Promise<User>;
    signin(email: string, password: string): Promise<User | {
        accessToken: string;
    }>;
    UpdateUser(id: number, data: Partial<User>): Promise<Partial<User> & User>;
    findUserByEmail(email: string): Promise<User>;
    deleteUserById(id: number): Promise<User>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
