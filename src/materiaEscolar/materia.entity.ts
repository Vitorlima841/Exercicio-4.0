import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, ManyToOne, JoinColumn,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';
import { Nota } from '../Nota/nota.entity';

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => Nota, (nota) => nota.materia)
  @JoinColumn()
  nota: Nota[];

  @OneToMany(() => Grade, (grade) => grade.materia)
  grade: Grade;
}
