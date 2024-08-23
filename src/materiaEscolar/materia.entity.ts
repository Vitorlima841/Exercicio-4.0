import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { Grade } from '../gradeEscolar/grade.entity';
import { Nota } from '../Nota/nota.entity';

@Entity()
export class Materia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nome: string;

    @ManyToMany(() => Grade, grade => grade.materias)
    grades: Grade[];

    @ManyToOne(() => Aluno, Aluno => Aluno.Materia)
    Aluno: Aluno

    @OneToOne(() => Nota, nota => nota.materia)
    nota: Nota
}