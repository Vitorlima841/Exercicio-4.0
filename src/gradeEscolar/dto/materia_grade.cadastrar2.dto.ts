import { Materia } from '../../materiaEscolar/materia.entity';
import { Nota } from '../../Nota/nota.entity';

export interface materia_radeCadastrarDto{
  idmateria_grade?: number;
  materia: Materia[];
  nota?: Nota;
}