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
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  //aprendneo a ausar o goti

  @OneToMany(() => Grade, (grade) => grade.aluno)
  grade: Grade[];
}