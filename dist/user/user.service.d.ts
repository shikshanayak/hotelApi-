import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private readonly repo;
    constructor(repo: Repository<User>);
    private hashPassword;
    private comparepassword;
    signup(email: string, password: string): Promise<User>;
    signin(email: string, password: string): Promise<User | {
        accessToken: string;
    }>;
    UpdateUser(id: number, data: Partial<User>): Promise<Partial<User> & User>;
    deleteUserById(id: number): Promise<User>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
