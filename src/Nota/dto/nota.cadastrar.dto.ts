import { IsNumber, IsUUID, Min, Max, IsBoolean } from 'class-validator';
import { Aluno } from '../../Aluno/aluno.entity';
import { Materia } from '../../materiaEscolar/materia.entity';

export class NotaCadastrarDto {
  @IsNumber()
  id?: number

  @IsNumber()
  @Min(0)
  @Max(100)
  valor: number;

  @IsBoolean({ each: false })
  maior80: boolean[];

  @IsBoolean()
  verificaConcluir: boolean

  alunoID: Aluno;

  materiaID: Materia;
}