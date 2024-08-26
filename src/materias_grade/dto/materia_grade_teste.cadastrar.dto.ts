import { Grade } from '../../gradeEscolar/grade.entity';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Nota } from '../../Nota/nota.entity';

export interface Materia_grade_testeCadastrarDto{
  id?: number;
  gradeID: number;
}