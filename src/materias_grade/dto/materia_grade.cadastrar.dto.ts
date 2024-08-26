import { Grade } from '../../gradeEscolar/grade.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Nota } from '../../Nota/nota.entity';

export interface Materia_gradeCadastrarDto{
  id?: number;
  grade?: Grade;
  materia: Materia[];
  nota?: Nota;
}