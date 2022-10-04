import { CanActivate, ExecutionContext , UnauthorizedException} from "@nestjs/common";

import { Observable } from "rxjs";




export class AdminGuard implements CanActivate{
    async canActivate(context: ExecutionContext){
        const req = context.switchToHttp().getRequest();
        console.log(req.headers.authorization);
        const [, token ] = req.headers.authorization.split(' ');
        if(!token) throw new UnauthorizedException("token is there");
        return req.user.isAdmin
    }
}