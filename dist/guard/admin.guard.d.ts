import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from 'src/user/user.entity';
export declare class AdminGuard implements CanActivate {
    private readonly userService;
    constructor(userService: Repository<User>);
    canActivate(context: ExecutionContext): Promise<any>;
}
