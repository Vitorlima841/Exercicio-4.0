export class HistoricoAlunoDTO {
  id: number;
  nome: string;
  grades: GradeDTO[];
}

export class GradeDTO {
  id: number;
  materias: MateriaDTO[];
}

export class MateriaDTO {
  id: number;
  nome: string;
  notas: NotaDTO[];
}

export class NotaDTO {
  id: number;
  valor: number;
  verificaConcluir: boolean;
}
