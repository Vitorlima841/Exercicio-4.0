import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Materia } from '../materiaEscolar/materia.entity';
import { Grade } from '../gradeEscolar/grade.entity';
import { Nota } from '../Nota/nota.entity';

@Entity('aluno')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToOne(() => Grade, grade => grade.aluno)
  @JoinColumn()
  grade: Grade;

  @OneToOne(() => Nota, nota => nota.aluno)
  @JoinColumn()
  nota: Nota;

  @OneToMany(() => Materia, Materia => Materia.Aluno)
  @JoinColumn({name: 'Categoria_ID'})
  Materia: Materia[]
}