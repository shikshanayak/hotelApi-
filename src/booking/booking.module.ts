import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/guard/auth.guard';
import { Rooms } from 'src/rooms/rooms.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { BookingController } from './booking.controller';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Rooms,User, Booking]), RoomsModule,UserModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
