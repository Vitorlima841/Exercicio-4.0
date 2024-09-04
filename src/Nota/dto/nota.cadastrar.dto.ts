import { IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Aluno } from '../../Aluno/aluno.entity';

export class NotaCadastrarDto {
  @IsInt({ message: 'O valor deve ser um número inteiro.' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0 e menor ou igual a 100.' })
  @Max(100, { message: 'O valor deve ser menor ou igual a 100 e maior ou igual a 0.' })
  valor: number;

  materia: Materia;
  materia_grade?: Materia_grade;
  aluno: Aluno;

}