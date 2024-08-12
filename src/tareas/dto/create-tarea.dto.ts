import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsString, MinLength } from "class-validator";






export class CreateTareaDto {

    @ApiProperty({
        description: 'Título de la tarea',
        nullable: false,
        minLength: 10
    })
    @IsString()
    @MinLength(10)
    titulo: string;

    @ApiProperty({
        description: 'Descripción de la tarea',
        nullable: false,
        minLength: 10
    })
    @IsString()
    @MinLength(10)
    descripcion: string;

    @ApiProperty({
        description: 'Fecha límite para completar la tarea',
        nullable: true
    })
    @IsDateString()
    fechaLimite: Date;

    @ApiProperty({
        description: 'Determina si la tarea está terminada',
        nullable: false
    })
    @IsBoolean()
    terminada: boolean;
}
