import { Grade } from '../../gradeEscolar/grade.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Nota } from '../../Nota/nota.entity';

export interface Materia_gradeCadastrarDto{
  id?: number;
  // materiaConcluida: boolean;
  materia: Materia;
  grade: Grade;
  nota?: Nota[];
}
