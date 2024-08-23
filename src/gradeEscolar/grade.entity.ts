import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, BeforeInsert, } from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { BadRequestException } from '@nestjs/common';
import { MateriaCadastrarDto } from '../materiaEscolar/dto/materia.cadastrar.dto';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Aluno, aluno => aluno.grade)
  aluno: Aluno;

  @ManyToMany(() => Materia, materia => materia.grades, { cascade: true })
  @JoinTable({name: "Grade_materia"})
  materias: MateriaCadastrarDto[];

  @BeforeInsert()
  checkMinimumMaterias() {
    if (this.materias.length < 5) {
      throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
    }
  }
}