import { Body, Controller, Get, Post } from '@nestjs/common';
import { Materia_gradeService } from './materia_grade.service';
import { Materia_grade } from './materia_grade.entity';
import { ResultadoDto } from '../dto/resultado.dto';
import { Materia_gradeCadastrarDto } from './dto/materia_grade.cadastrar.dto';

@Controller('materia_grade')
export class Materia_gradeController{
  constructor(private readonly materia_gradeService: Materia_gradeService) {}

  @Get('')
  async mostrarMaterias_grade(): Promise<Materia_grade[]>{
    return this.materia_gradeService.mostrarMaterias_grade()
  }

  @Post('')
  async cadastrarMateria_grade(@Body()data: Materia_gradeCadastrarDto): Promise<ResultadoDto>{
    return this.materia_gradeService.cadastrarMateria_grade(data)
  }
}
