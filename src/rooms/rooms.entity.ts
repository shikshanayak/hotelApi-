import { User } from "src/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from "typeorm";


@Entity()
export class Rooms{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    roomno: number;

    @Column({default: true})
    IsAvailable: boolean

    @Column()
    price: number

    @ManyToOne(() => User, (user) => user.rooms)
    user: User

}