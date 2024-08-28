import { Aluno } from '../../Aluno/aluno.entity';
import { Nota } from '../../Nota/nota.entity';
import { Materia } from '../../materiaEscolar/materia.entity';

export interface GradeCadastrarDto{
  id?: number;
  aluno: Aluno;
  nota?: Nota[];
  materia: Materia[];
}