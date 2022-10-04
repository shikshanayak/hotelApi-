import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    signup(body: CreateUserDto): Promise<import("./user.entity").User>;
    signin(body: any): Promise<import("./user.entity").User | {
        accessToken: string;
    }>;
    updateUser(id: string, body: CreateUserDto): Promise<Partial<import("./user.entity").User> & import("./user.entity").User>;
    deteleUserById(id: string): Promise<import("./user.entity").User>;
    deleteAll(): Promise<import("typeorm").DeleteResult>;
}
