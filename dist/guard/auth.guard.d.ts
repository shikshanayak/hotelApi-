import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly userrepo;
    private readonly usersService;
    constructor(userrepo: Repository<User>, usersService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
