import { User } from "src/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from "typeorm";


@Entity()
export class Rooms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    roomno: number;

    @Column({default: "available"})
    IsAvailable: string;

    @Column()
    price: number;

    @ManyToOne(() => User, (user) => user.rooms, {cascade: true, eager : true})
    user: User

}

// @Column()
// bookingdate: Date

// @Column()
// checkin: Date

// @Column()
// checkout: Date
    