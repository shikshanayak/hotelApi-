import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Rooms } from './rooms/rooms.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    entities: [User, Rooms, Booking],
    synchronize: true,
    autoLoadEntities: true,
    database: 'hotelapi'
    
  })  ,UserModule, RoomsModule, BookingModule]
})
export class AppModule {}
