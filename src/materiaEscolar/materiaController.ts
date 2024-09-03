import { Body, Controller, Get, Post } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { Materia } from './materia.entity';
import { MateriaCadastrarDto } from './dto/materia.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('materia')
export class MateriaController{
  constructor(private readonly materiaService: MateriaService) {}

  @Get('mostrarMaterias')
  async mostrarMaterias(): Promise<Materia[]>{
    return this.materiaService.mostrarMaterias()
  }

  @Post('')
  async cadastrarMateria(@Body()data: MateriaCadastrarDto): Promise<ResultadoDto>{
    return this.materiaService.cadastrarMateria(data)
  }
}