import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, OneToMany, JoinTable, JoinColumn,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { Nota } from '../Nota/nota.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.grade)
  aluno: Aluno;

  @OneToMany(() => Materia_grade, (materia_grade) => materia_grade.grade)
  materia_grade: Materia_grade[];
}
