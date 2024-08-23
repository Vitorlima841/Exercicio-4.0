export class HistoricoAlunoDto {
  alunoId: number;
  nome: string;
  grade: {
    id: number;
    materias: { id: number; nome: string; status: string }[];
    status: string;
  };
  desempenho: {
    materia: string;
    notas: { valor: number; data: Date }[];
    status: string;
  }[];
  mediaGeral: number;
}