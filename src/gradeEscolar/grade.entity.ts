import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { Nota } from '../Nota/nota.entity';
import { Materia } from '../materiaEscolar/materia.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.grade, { nullable: false } )
  aluno: Aluno;

  @OneToMany(() => Materia_grade, (materia_grade) => materia_grade.grade)
  materia_grade: Materia_grade[];
}
