import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'tareas'})
export class Tarea {

    @ApiProperty({
        example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
        description: 'Tarea ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: string;

    @ApiProperty({
        example: 'Tarea 1',
        description: 'Tarea Titulo',
    })
    @Column()
    titulo: string;

    @ApiProperty({
        example: 'Descripcion de la tarea 1',
        description: 'Tarea Descripcion',
    })
    @Column()
    descripcion: string;

    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha de Creacion',
    })
    @Column()
    fechaCreacion: Date;

    @ApiProperty({
        example: '2021-10-10',
        description: 'Fecha Limite',
    })
    @Column()
    fechaLimite: Date;
    
    @ApiProperty({
        example: 'true',
        description: 'Tarea Terminada',
    })
    @Column()
    terminada: boolean;

    
    @ManyToOne(
        () => User,
        ( user ) => user.tarea,
        { eager: true }
    )
    user: User
}
