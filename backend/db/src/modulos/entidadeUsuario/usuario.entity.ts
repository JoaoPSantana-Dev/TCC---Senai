import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique:true})
    username:string;
    
    @Column()
    password: string;
}