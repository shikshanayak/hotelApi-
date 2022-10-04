import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private userService;
    constructor(userService: Repository<User>);
    createRoom(): Promise<void>;
    getrooms(): Promise<User[]>;
    updateRoom(): Promise<void>;
    deleteRoom(): Promise<void>;
}
