import { User } from "src/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn , ManyToOne} from "typeorm";


@Entity()
export class Booking{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    roomno: number;

    @Column({default: 'available'})
    status: string;

    @ManyToOne(() => User, user => user , {cascade: true, eager : true})
    user: User
}

// {default: () => "CURRENT_TIMESTAMP"}