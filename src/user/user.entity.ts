
import { Rooms } from "src/rooms/rooms.entity";
import { Column, Entity, PrimaryGeneratedColumn , OneToMany} from "typeorm";
import { Exclude } from "class-transformer";

  
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default: false })
    @Exclude()
    isAdmin: Boolean

    @OneToMany(() => Rooms, (rooms) => rooms.roomno)
    rooms: Rooms[];


}
// enum Type {
//    admin =  "admin",
//     user = "user"
//   }
// export type Type = "admin" | "user";

// export enum UserRole {
//     ADMIN = "admin",
//     USER = "user"
// }
