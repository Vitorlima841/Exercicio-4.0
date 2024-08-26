import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne, ManyToOne,
} from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { Grade } from '../gradeEscolar/grade.entity';

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

  @ManyToOne(() => Materia_grade, (materia_grade) => materia_grade.nota)
  materia_grade: Materia_grade;

  @ManyToOne(() => Materia, (materia) => materia.nota)
  materia: Materia;

  @ManyToOne(() => Grade, (grade) => grade.nota)
  grade: Grade;

  @BeforeInsert()
  checkMinimumMaterias() {
    if (this.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }
  }
}
