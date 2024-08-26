import { Materia_grade } from '../../materias_grade/materia_grade.entity';

export interface MateriaCadastrarDto{
  id?: number;
  nome: string;
  materia_grade?: Materia_grade[];
}