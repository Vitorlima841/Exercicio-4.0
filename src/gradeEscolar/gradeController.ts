import { Body, Controller, Get, Post } from '@nestjs/common';
import { GradeService } from './grade.service';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('Grade')
export class GradeController{
  constructor(
    private readonly gradeService: GradeService
  ) {}

  @Get('mostrarGrades')
  async mostrarGrades(): Promise<Grade[]>{
    return this.gradeService.mostrarGrades()
  }

  @Post('cadastrarGrade')
  async cadastrarGrades(@Body()data: GradeCadastrarDto): Promise<ResultadoDto>{
    return this.gradeService.cadastrarGrade(data)
  }
}