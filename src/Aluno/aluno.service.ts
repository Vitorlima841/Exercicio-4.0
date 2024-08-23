import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { HistoricoAlunoDto } from './dto/Hitorico.Aluno.dto';

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
    aluno.id = data.id
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
  // async getHistoricoAluno(alunoId?: number): Promise<HistoricoAlunoDto[]> {
  //   if (alunoId) {
  //     const aluno = await this.alunoRepository.find(alunoId);
  //
  //     // Processar e formatar os dados do histórico para o aluno específico
  //     // ...
  //
  //     return formattedHistorico;
  //   } else {
  //     const alunos = await this.alunoRepository.find();
  //     // Processar e formatar os dados de todos os alunos
  //     // ...
  //
  //     return formattedHistoricos;
  //   }
  // }



}