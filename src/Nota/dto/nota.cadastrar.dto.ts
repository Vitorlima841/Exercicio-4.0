import { IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export class NotaCadastrarDto {
  id?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  valor: number;

  @IsBoolean()
  verificaConcluir?: boolean;

  materia_grade: Materia_grade;

}