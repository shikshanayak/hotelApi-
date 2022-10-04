import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Rooms } from 'src/rooms/rooms.entity';
import { Booking } from 'src/booking/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rooms, Booking])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule]
})
export class UserModule {}
