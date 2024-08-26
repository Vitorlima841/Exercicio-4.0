import { Materia } from '../../materiaEscolar/materia.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export interface AlunoCadastrarDto{
  id?: number;
  nome: string;
  grade?: Grade;
}