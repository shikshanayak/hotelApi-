import { Injectable, CanActivate, ExecutionContext , UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRepository(User) private readonly userrepo: Repository<User>,
  private readonly usersService: UserService
  ){}
  async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization) throw new UnauthorizedException("authorization token does not exist")
    const [_, token ] =  request.headers.authorization.split(' ');
    try {
      const payload = jwt.verify(token, 'super_secret');
      const email = payload['email'];
      const user = await this.usersService.findUserByEmail(email);
      request.user = user;
      return true;
    } catch (error) {
      console.log('unable to auth');
      console.log(error.message);
      return false;
    }
    
  }
}