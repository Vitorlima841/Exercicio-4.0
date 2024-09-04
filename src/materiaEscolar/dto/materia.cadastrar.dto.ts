import { IsString } from 'class-validator';

export class MateriaCadastrarDto{
  id?: number;

  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;
}