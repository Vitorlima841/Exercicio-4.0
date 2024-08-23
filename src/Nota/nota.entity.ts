import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToOne,
  BeforeInsert,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Grade } from '../gradeEscolar/grade.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { BadRequestException } from '@nestjs/common';
import { AlunoCadastrarDto } from '../Aluno/dto/aluno.cadastrar.dto';
import { MateriaCadastrarDto } from '../materiaEscolar/dto/materia.cadastrar.dto';

@Entity()
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  valor: number;

  @Column('boolean')
  maior80: boolean[]// quando chegar em 3 true, fazer o verificaConcluir como true

  @Column('boolean')
  verificaConcluir: boolean

  @OneToOne(() => Aluno, aluno => aluno.nota)
  aluno: Aluno

  @OneToOne(() => Materia, materia => materia.nota)
  materia: Materia

  @BeforeInsert()
  checkMinimumMaterias() {
    if (this.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }
  }
}