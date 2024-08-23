import { MateriaCadastrarDto } from '../../materiaEscolar/dto/materia.cadastrar.dto';
import { IsString, IsArray, ArrayMinSize } from 'class-validator';
import { Aluno } from '../../Aluno/aluno.entity';

export interface GradeCadastrarDto{
  id?: number;
  aluno_id: Aluno;
  materias: MateriaCadastrarDto[];
}