import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.grade, { nullable: false } )
  @JoinColumn({ name: 'alunoId' }) // Opcional, para especificar o nome da coluna no banco de dados
  aluno: Aluno;

  @OneToMany(() => Materia_grade, (materia_grade) => materia_grade.grade)
  materia_grade: Materia_grade[];
}
