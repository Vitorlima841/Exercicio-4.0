import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './nota.entity';
import { NotaController } from './notaController';
import { NotaService } from './nota.service';
import { Materia_gradeController } from '../materias_grade/materia_gradeController';
import { Materia_gradeService } from '../materias_grade/materia_grade.service';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { AlunoService } from '../Aluno/aluno.service';
import { Aluno } from '../Aluno/aluno.entity';
import { GradeService } from '../gradeEscolar/grade.service';
import { Grade } from '../gradeEscolar/grade.entity'; // Importe a entidade Materia

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota, Materia_grade, Aluno,Grade]), // Registre a entidade Materia
  ],
  controllers: [NotaController, Materia_gradeController],
  providers: [NotaService, Materia_gradeService, AlunoService,GradeService],
})
export class NotaModule {}
