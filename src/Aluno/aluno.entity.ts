import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany, JoinTable,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Grade, (grade) => grade.aluno)
  grade: Grade[];
}