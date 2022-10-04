import { Injectable, CanActivate, ExecutionContext , UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization) throw new UnauthorizedException("authorization token does not exist")
    const [_, token ] =  request.headers.authorization.split(' ');
    const verifiedUser = jwt.verify(token, 'super_secret');
    request.user = verifiedUser;
   if(verifiedUser){
    return true;
   }
   
   return false;
  }
}