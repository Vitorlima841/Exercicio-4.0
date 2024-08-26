import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number[];

  // @Column('boolean')
  // maior80: boolean;

  @Column('boolean')
  verificaConcluir: boolean;

  @OneToOne(() => Materia_grade, (materia_grade) => materia_grade.nota)
  materia_grade: Materia_grade;

  @BeforeInsert()
  checkMinimumMaterias() {
    if (this.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }
  }
}
