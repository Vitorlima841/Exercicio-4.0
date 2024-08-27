import {
  Entity,
  PrimaryGeneratedColumn, ManyToOne,OneToMany,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { Nota } from '../Nota/nota.entity';

@Entity()
export class Materia_grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grade, (grade) => grade.materia_grade)
  grade: Grade;

  @ManyToOne(() => Materia, (materia) => materia.materia_grade)
  materia: Materia

  @OneToMany(() => Nota, (nota) => nota.materia_grade)
  nota: Nota[];
}
