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
  //aprendneo a usar o git
//nao sei oq colocar
//teste
  //boa pegunta
  @OneToMany(() => Grade, (grade) => grade.aluno)
  grade: Grade[];
}
//testando

//colocando masi coisas
  //tentand
