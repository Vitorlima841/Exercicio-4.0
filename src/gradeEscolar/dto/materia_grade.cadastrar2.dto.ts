import { Materia } from '../../materiaEscolar/materia.entity';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';
import { Nota } from '../../Nota/nota.entity';

export interface materia_radeCadastrarDto{
  idmateria_grade?: number;
  materia: Materia[];
  materia_grade: Materia_grade[];
  nota?: Nota;
}