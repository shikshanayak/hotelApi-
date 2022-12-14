import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/booking/booking.entity';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { RoomsController } from './rooms.controller';
import { Rooms } from './rooms.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Rooms, Booking]), UserModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
