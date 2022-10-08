import { CanActivate, ExecutionContext , UnauthorizedException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User} from 'src/user/user.entity'
export class AdminGuard implements CanActivate{
    constructor(@InjectRepository(User) private readonly userService: Repository<User>){}
    
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        console.log(req.user);
        
        // console.log(req.user);
        if(!req.user.isAdmin) throw new UnauthorizedException("isadmin is not found")
        return req.user.isAdmin
        
    }
}
// console.log(req.headers.authorization);
// const [, token ] = req.headers.authorization.split(' ');
// console.log(token);
// if(!token) throw new UnauthorizedException("token is there");
// if(req.user.isAdmin){
        //     return true
        // }
        // return false;