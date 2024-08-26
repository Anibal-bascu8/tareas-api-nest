import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Tarea } from './entities/tarea.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@ApiTags('Tareas')
@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  @Auth()
  @ApiResponse({ status: 201, description: 'Tarea creada correctamente', type: Tarea  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden. Token related.' })
  create(
    @Body() createTareaDto: CreateTareaDto,
    @GetUser() user: User,
  ) {
    return this.tareasService.create(createTareaDto, user);
  }

  @Post('obtenerTodas')
  @Auth()
  findAll(@Body() paginationDto: PaginationDto) {
    return this.tareasService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.tareasService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.tareasService.remove(id);
  }
}
