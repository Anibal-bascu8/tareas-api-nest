import { IsString } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    @IsString()
    username: string;

    @Column()
    @IsString()
    password: string;

    @Column()
    @IsString()
    role: string;
    
    @Column()
    @IsString()
    name: string;

    
    @Column()
    @IsString()
    lastName: string;
}
