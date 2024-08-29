import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { BadRequestException } from '@nestjs/common';
import { Materia } from '../materiaEscolar/materia.entity';
import { Grade } from '../gradeEscolar/grade.entity';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number;

  @Column()
  verificaConcluir: boolean;

  @ManyToOne(() => Materia_grade, (materia_grade) => materia_grade.nota)
  materia_grade: Materia_grade;

  @BeforeInsert()
  validate() {
    if (this.valor < 0 || this.valor > 100) {
      throw new BadRequestException('O valor deve estar entre 0 e 100.');
    }
  }
}
