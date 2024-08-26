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

  @Column({ default: false })
  verificaConcluir: boolean;

  @ManyToOne(() => Materia_grade, (materia_grade) => materia_grade.nota)
  materia_grade: Materia_grade;

  @BeforeInsert()
  checkMinimumMaterias() {
    if (this.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }
  }
}
