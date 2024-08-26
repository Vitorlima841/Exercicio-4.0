import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { HistoricoAlunoDTO} from './dto/Hitorico.Aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @Inject('ALUNO_REPOSITORY')
    private alunoRepository: Repository<Aluno>,
  ) {}

  async mostrarAlunos(): Promise<Aluno[]> {
    return this.alunoRepository.find();
  }

  async cadastrarAluno(data: AlunoCadastrarDto): Promise<ResultadoDto>{
    let aluno = new Aluno()
    aluno.nome = data.nome
    aluno.idteste = data.idteste
    aluno.grade = data.grade
    return this.alunoRepository.save(aluno)
      .then((result) =>{
        return <ResultadoDto>{
          status: true,
          mensagem: "Aluno cadastrado"
        }
      })
      .catch((error) =>{
        return <ResultadoDto>{
          status: false,
          mensagem: "Aluno não cadastrado"
        }
      })
  }
  async getHistoricoAluno(): Promise<{
    nome: string;
    id: number;
    grade: {
      id: number;
      materia: { nota: { valor: number[]; id: number; verificaConcluir: boolean }[]; nome: string; id: number }[]
    }[]
  }[]> {
    const alunos = await this.alunoRepository.find({
      relations: ['grade', 'grade.materia', 'grade.materia.nota'],
    });

    return alunos.map(aluno => ({
      id: aluno.idteste,
      nome: aluno.nome,
      grade: aluno.grade.map(grade => ({
        id: grade.id,
        materia: grade.materia.map(materia => ({
          id: materia.id,
          nome: materia.nome,
          nota: materia.nota.map(nota => ({
            id: nota.id,
            valor: nota.valor,
            verificaConcluir: nota.verificaConcluir,
          })),
        })),
      })),
    }));
  }

  async getHistoricoAlunoID(alunoId: number) {
    const aluno = await this.alunoRepository.findOne({
      where: { idteste: alunoId },
      relations: ['grade', 'grade.materia', 'grade.nota'],
    });

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    return aluno;
  }

}