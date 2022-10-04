import { Injectable , BadRequestException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>){}

    private async  hashPassword(password: string){
        const saltOrRounds = 10;
        password = 'random_password';
        const hash =  await bcrypt.hash(password, saltOrRounds);
        return hash;

    }
    private async comparepassword(password: string, hashPassword: string){
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    }

    async signup(email: string , password: string){
        const existingEmail = await this.repo.findOne({where: {email}});
        console.log(existingEmail);
        if(existingEmail) throw new BadRequestException("email already exist")
        const hashedpassword = await this.hashPassword(password);
        const user =  this.repo.create({email, password: hashedpassword});
        return  await this.repo.save(user);
        

    }

    async signin(email: string, password: string){
        const existingUser = await this.repo.findOne({where: {email}});
        if(!existingUser) throw new NotFoundException('user not found')
        const ispasswordMatched = await this.comparepassword(password, existingUser.password);
        if(ispasswordMatched) throw new BadRequestException("password is not matched");
        if(existingUser){
            return {accessToken: jwt.sign({sub: existingUser.id, email: existingUser.email}, 'super_secret', {expiresIn: '5d'})}
        } 
        console.log(existingUser);
        return existingUser;
    }

    async UpdateUser(id: number, data: Partial<User>){
        const index =  this.repo.findOne({where: {id}})
        if(!index) throw new BadRequestException("user with this email not found");
        Object.assign(index, data)
        return this.repo.save(data)

    }

    async deleteUserById(id: number){
        const index =  await this.repo.findOne({where: {id}})
        if(!index) throw new BadRequestException("user with this email not found");
        return this.repo.remove(index)
    }

    async  deleteAll(){
        return this.repo.delete({})
    }

}

        
        
        