import {
  Entity,
  PrimaryGeneratedColumn, ManyToOne, BeforeInsert, OneToOne, JoinColumn,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { Nota } from '../Nota/nota.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Materia_grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grade, (grade) => grade.materia_grade)
  grade: Grade;

  @ManyToOne(() => Materia, (materia) => materia.materia_grade)
  materia: Materia[];

  @OneToOne(() => Nota, (nota) => nota.materia_grade)
  @JoinColumn()
  nota: Nota;

  // @BeforeInsert()
  // checkMinimumMaterias() {
  //   if (this.materia.length < 5) {
  //     throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
  //   }
  // }
}
