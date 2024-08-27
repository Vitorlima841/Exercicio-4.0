import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number;

  @Column()
  verificaConcluir: boolean;

  @ManyToOne(() => Materia_grade, (materia_grade) => materia_grade.nota)
  materia_grade: Materia_grade;
}
