import { IsNumber, IsUUID, Min, Max, IsBoolean } from 'class-validator';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export class NotaCadastrarDto {
  id?: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  valor: number[];

  @IsBoolean()
  verificaConcluir?: boolean;

  materia: Materia;
  grade:Grade;

}