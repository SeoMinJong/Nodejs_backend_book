import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number

    @Column({unique:true})
    email: String

    @Column()
    password: String
    
    @Column()
    username: String

    @Column({default:true})
    createdDt: Date = new Date();
}