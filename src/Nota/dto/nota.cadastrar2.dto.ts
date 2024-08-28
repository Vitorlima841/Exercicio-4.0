import { IsNumber, IsUUID, Min, Max, IsBoolean } from 'class-validator';
import { Materia } from '../../materiaEscolar/materia.entity';
import { Grade } from '../../gradeEscolar/grade.entity';

export class NotaCadastrar2Dto {
  id: number;
}