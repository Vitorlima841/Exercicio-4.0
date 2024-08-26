import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, OneToMany, JoinTable, JoinColumn,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.grade)
  @JoinColumn()
  aluno: Aluno;

  @OneToMany(() => Materia_grade, (materia_grade) => materia_grade.grade)
  materia_grade: Materia_grade[];
}
