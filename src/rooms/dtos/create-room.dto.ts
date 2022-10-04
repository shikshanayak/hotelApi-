import { IsNumber, IsNotEmpty} from 'class-validator'


export class CreateRoomDto{
    @IsNumber()
    @IsNotEmpty()
    roomno: number

    @IsNumber()
    @IsNotEmpty()
    price: number;
}