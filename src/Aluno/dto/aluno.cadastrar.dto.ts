import { Grade } from '../../gradeEscolar/grade.entity';
import { IsString } from 'class-validator';

export class AlunoCadastrarDto{
  id?: number;

  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  grade?: Grade[];
}