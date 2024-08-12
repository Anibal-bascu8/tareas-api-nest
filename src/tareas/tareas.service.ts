import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class TareasService {

  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) { }

  async create(createTareaDto: CreateTareaDto) {
    try {

      const { titulo, descripcion, terminada, fechaLimite } = createTareaDto;

      const tarea = this.tareaRepository.create({
        titulo,
        descripcion,
        terminada,
        fechaCreacion: new Date(),
        fechaLimite,
      });

      await this.tareaRepository.save(tarea);

      return tarea;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0 } = paginationDto;

    return this.tareaRepository.find({
      take: limit,
      skip: offset,
    });
    

  }

  findOne(id: string) {
    const tareaEncontrada = this.tareaRepository.findOne({
      where: { id }
    });

    if (!tareaEncontrada)
      throw new BadRequestException('Tarea no encontrada');

    return tareaEncontrada;
  }

  update(id: string, updateTareaDto: UpdateTareaDto) {
    const tareaPrevia = this.tareaRepository.findOne({
      where: { id }
    });

    if (!tareaPrevia)
      throw new BadRequestException('Tarea no encontrada');

    console.log(tareaPrevia);

    return `This action updates a #${id} tarea`;
  }

  async remove(id: string) {
    
    const tareaPrevia = this.tareaRepository.findOne({
      where: { id }
    });

    if (!tareaPrevia)
      throw new BadRequestException('Tarea no encontrada');

    await this.tareaRepository.delete({ id });
  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    // this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
