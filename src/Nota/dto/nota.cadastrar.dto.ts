import { IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';

export class NotaCadastrarDto {
  @IsInt({ message: 'O valor deve ser um número inteiro.' })
  @Min(0, { message: 'O valor deve ser maior ou igual a 0.' })
  @Max(100, { message: 'O valor deve ser menor ou igual a 100.' })
  valor: number;


  materia_grade: Materia_grade;

}