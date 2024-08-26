import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Materia } from '../materiaEscolar/materia.entity';
import { Grade } from '../gradeEscolar/grade.entity';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number[];

  @Column('boolean')
  verificaConcluir: boolean;

  @ManyToOne(() => Materia, (materia) => materia.nota)
  materia: Materia;

  @ManyToOne(() => Grade, (grade) => grade.nota)
  grade: Grade;

  // @BeforeInsert()
  // checkMinimumMaterias() {
  //   if (this.verificaConcluir) {
  //     throw new BadRequestException('O aluno concluiu a materia.');
  //   }
  // }
}
