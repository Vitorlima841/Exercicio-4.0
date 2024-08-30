import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { GradeController } from './gradeController';
import { GradeService } from './grade.service';
import { Materia_gradeService } from '../materias_grade/materia_grade.service';
import { Materia_grade } from '../materias_grade/materia_grade.entity'; // Importe a entidade Materia

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade,Materia_grade]), // Registre a entidade Materia
  ],
  controllers: [GradeController],
  providers: [GradeService, Materia_gradeService],
})
export class GradeModule {}
