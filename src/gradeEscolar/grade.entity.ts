import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne, OneToMany, JoinTable, JoinColumn,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Nota } from '../Nota/nota.entity';
import { Materia } from '../materiaEscolar/materia.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.grade)
  @JoinColumn()
  aluno: Aluno;

  @OneToMany(() => Nota, (nota) => nota.grade)
  nota: Nota[];

  @ManyToOne(() => Materia, (materia) => materia.grade)
  materia: Materia[];
}
