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

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdDt: Date;
}