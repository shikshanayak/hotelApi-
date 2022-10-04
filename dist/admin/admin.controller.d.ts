import { UserService } from 'src/user/user.service';
import { AdminService } from './admin.service';
export declare class AdminController {
    private userService;
    private adminService;
    constructor(userService: UserService, adminService: AdminService);
    getuser(req: any): void;
}
