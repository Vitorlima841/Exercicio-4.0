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
  idteste: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Grade, (grade) => grade.aluno)
  @JoinColumn()
  grade: Grade[];
}