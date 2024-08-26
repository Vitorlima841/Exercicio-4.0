import { Materia } from '../../materiaEscolar/materia.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export interface AlunoCadastrarDto{
  idteste?: number;
  nome: string;
  grade?: Grade[];
}