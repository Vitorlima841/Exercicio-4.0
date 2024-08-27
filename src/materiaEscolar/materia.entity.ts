import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Materia_grade, (materia_grade) => materia_grade.materia)
  materia_grade: Materia_grade[];
}
