import { IsNumber, IsUUID, Min, Max, IsBoolean } from 'class-validator';
import { Aluno } from '../../Aluno/aluno.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';
import { Nota } from '../nota.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export class NotaCadastrarDto {
  id?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  valor: number[];

  @IsBoolean()
  verificaConcluir?: boolean = false;

  materia_grade: Materia_grade;
  // materia: Materia;
  // grade: Grade;
}