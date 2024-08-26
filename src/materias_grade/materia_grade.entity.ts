import {
  Entity,
  PrimaryGeneratedColumn, ManyToOne, BeforeInsert, OneToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Grade } from '../gradeEscolar/grade.entity';
import { Materia } from '../materiaEscolar/materia.entity';
import { Nota } from '../Nota/nota.entity';
import { BadRequestException } from '@nestjs/common';

function OneToMnay(param: () => Nota, param2: (nota) => any) {

}

@Entity()
export class Materia_grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grade, (grade) => grade.materia_grade)
  grade: Grade;

  @ManyToOne(() => Materia, (materia) => materia.materia_grade)
  materia: Materia

  @OneToMany(() => Nota, (nota) => nota.materia_grade)
  @JoinColumn()
  nota: Nota[];

  // @BeforeInsert()
  // checkMinimumMaterias() {
  //   if (this.materia.length < 5) {
  //     throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
  //   }
  // }
}
