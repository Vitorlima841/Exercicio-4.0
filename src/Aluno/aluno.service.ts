import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Injectable()
export class AlunoService {
  constructor(
    @Inject('ALUNO_REPOSITORY')
    private alunoRepository: Repository<Aluno>,
  ) {}

  async mostrarAlunos(): Promise<Aluno[]> {
    return this.alunoRepository.find();
  }

  async mostrarAlunosID(id : number): Promise<Aluno | null> {
    return this.alunoRepository.findOneBy({ id });
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

  async obterHistoricoTodosAlunosOrdenados(): Promise<any[]> {
    // Buscando todos os alunos com as relações necessárias
    const alunos = await this.alunoRepository.find({
      relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
    });

    if (!alunos || alunos.length === 0) {
      throw new NotFoundException('Nenhum aluno encontrado');
    }

    // Processando e calculando o score para cada aluno
    const alunosComScores = alunos.map(aluno => {
      // Calculando o maior score do aluno
      const score = aluno.grade.flatMap(grade =>
        grade.materia_grade.flatMap(materia_grade =>
          materia_grade.nota.map(nota => nota.valor)
        )
      ).reduce((max, nota) => Math.max(max, nota), 0);

      return {
        nome: aluno.nome,
        idaluno: aluno.id,
        score, // Adicionando o score ao resultado
        grades: aluno.grade.map(grade => ({
          gradeId: grade.id,
          materias: grade.materia_grade.map(materia_grade => ({
            materia: materia_grade.materia.nome,
            notas: materia_grade.nota.map(nota => ({
              valor: nota.valor,
              verificaConcluir: nota.verificaConcluir,
            })),
          })),
        })),
      };
    });

    // Ordenando os alunos pelo score, em ordem decrescente
    return alunosComScores.sort((a, b) => b.score - a.score);
  }


  async obterHistoricoTodosAlunos(): Promise<any[]> {
    const alunos = await this.alunoRepository.find({
      relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
    });

    if (!alunos || alunos.length === 0) {
      throw new NotFoundException('Nenhum aluno encontrado');
    }

    return alunos.map(aluno => ({
      nome: aluno.nome,
      idaluno: aluno.id,
      grades: aluno.grade.map(grade => ({
        gradeId: grade.id,
        materias: grade.materia_grade.map(materia_grade => ({
          materia: materia_grade.materia.nome,
          notas: materia_grade.nota.map(nota => ({
            valor: nota.valor,
            verificaConcluir: nota.verificaConcluir,
          })),
        })),
      })),
    }));
  }


  async obterHistoricoAlunoID(alunoId: number): Promise<any> {
    const aluno = await this.alunoRepository.findOne({
      where: { id: alunoId },
      relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
    });

    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }

    return aluno.grade.map(grade => ({
      nome: aluno.nome,
      idaluno: aluno.id,
      gradeId: grade.id,
      materia: grade.materia_grade.map(materia_grade => ({
        materia: materia_grade.materia.nome,
        nota: materia_grade.nota.map(nota => ({
          valor: nota.valor,
          verificaConcluir: nota.verificaConcluir,
        }))
      }))
    }));
  }
}