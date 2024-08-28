import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  idteste: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Grade, (grade) => grade.aluno)
  grade: Grade[];
}