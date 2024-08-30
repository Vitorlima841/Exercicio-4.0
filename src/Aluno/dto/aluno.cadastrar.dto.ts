import { Grade } from '../../gradeEscolar/grade.entity';

export interface AlunoCadastrarDto{
  id?: number;
  nome: string;
  grade?: Grade[];
}