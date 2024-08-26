import { Nota } from '../../Nota/nota.entity';

export interface MateriaCadastrarDto{
  id?: number;
  nome: string;
  nota: Nota[];
}