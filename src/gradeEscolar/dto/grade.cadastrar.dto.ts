import { Aluno } from '../../Aluno/aluno.entity';
import { Materia_grade } from '../../materias_grade/materia_grade.entity';

export interface GradeCadastrarDto{
  id?: number;
  aluno: Aluno;
  materia_grade: Materia_grade[];
}