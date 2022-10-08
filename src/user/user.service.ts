import { Injectable , BadRequestException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { Rooms } from 'src/rooms/rooms.entity';
import { userInfo } from 'os';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repo: Repository<User>,
    @InjectRepository(Rooms) private readonly roomsrepo: Repository<Rooms>){};
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

    async signup(email: string , password: string, isAdmin: boolean){
        const existingEmail = await this.repo.findOne({where: {email}});
        if(existingEmail) throw new BadRequestException("email already exist")
        const hashedpassword = await this.hashPassword(password);
        const user =  this.repo.create({email, password: hashedpassword, isAdmin: isAdmin});
        console.log(user);
        return  await this.repo.save(user);
    }

    async signin(email: string, password: string){
        const existingUser = await this.repo.findOne({where: {email}});
        if(!existingUser) throw new NotFoundException('user not found')
        const ispasswordMatched = await this.comparepassword(password, existingUser.password);
        if(ispasswordMatched) throw new BadRequestException("password is not matched");
        if(existingUser){
            return {accessToken: jwt.sign({sub: existingUser.id, email: existingUser.email, }, 'super_secret', {expiresIn: '365d'})}
        } 
        return existingUser;
    }
    

    async UpdateUser(id: number, data: Partial<User>){
        const index =  this.repo.findOne({where: {id}})
        if(!index) throw new BadRequestException("user with this email not found");
        Object.assign(index, data)
        return this.repo.save(data)

    }
    
    async findUserByEmail(email: string){
        try {
            const existingUser = await this.repo.findOne({where: {email}})
        return existingUser
        } catch (error) {
            return null
        }
        
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

        
        
        