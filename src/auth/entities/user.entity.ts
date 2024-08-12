import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tarea } from 'src/tareas/entities/tarea.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'mail@example.com',
        description: 'Email del Usuario',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    email: string;

    @ApiProperty({
        example: 'myS3cr3tP@ssw0rd',
        description: 'Password del Usuario',
    })
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Nombre Completo del Usuario',
    })
    @Column('text')
    fullName: string;

    @ApiProperty({
        example: 'true',
        description: 'Usuario Activo',
    })
    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @ApiProperty({
        example: 'user',
        description: 'Roles del Usuario',
    })
    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Tarea,
        ( tarea ) => tarea.user
    )
    tarea: Tarea;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

}
