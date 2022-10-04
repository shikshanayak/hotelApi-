import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private userService;
    constructor(userService: Repository<User>);
    getrooms(): Promise<User[]>;
}
