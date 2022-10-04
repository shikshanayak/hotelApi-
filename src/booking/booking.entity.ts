import { User } from "src/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from "typeorm";


@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id: number;

    // @Column('simple-array')
    // roomno: [];
    @Column()
    roomno: number

    @ManyToOne(() => User, user => user )
    user: User
}