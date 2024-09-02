import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlunoService {

  constructor(
    @InjectRepository(Aluno)
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
    aluno.grade = data.grade
    return this.alunoRepository.save(aluno)
      .then((result) =>{
        return <ResultadoDto>{
          status: true,
          mensagem: "Aluno cadastrado",
          result: aluno
        }
      })
      .catch((error) =>{
        return <ResultadoDto>{
          status: false,
          mensagem: "Aluno não cadastrado" + error.message
        }
      })
  }

  async obterHistoricoTodosAlunosOrdenados(): Promise<any[]> {
      const alunos = await this.alunoRepository.find({
        relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
      });

      if (!alunos || alunos.length === 0) {
      throw new NotFoundException('Nenhum aluno encontrado');
    }

    const alunosComScores = alunos.map(aluno => {
      const notas = aluno.grade.flatMap(grade =>
        grade.materia_grade.flatMap(materia_grade =>
          materia_grade.nota.map(nota => nota.valor)
        )
      );

      const somaNotas = notas.reduce((total, nota) => total + nota, 0);
      const mediaNotas = notas.length > 0 ? somaNotas / notas.length : 0;

      return {
        nome: aluno.nome,
        idaluno: aluno.id,
        media: mediaNotas,
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

    const alunosOrdenados = alunosComScores.sort((a, b) => b.media - a.media);

    return alunosOrdenados.map(aluno => ({
      ...aluno,
      media: parseFloat(aluno.media.toFixed()),
    }));
  }



  async obterHistoricoTodosAlunos(): Promise<Aluno[]> {
    return await this.alunoRepository.find({
      relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
    });
  }

  async obterHistoricoAlunoID(alunoId: number): Promise<any> {
    return await this.alunoRepository.findOne({
      where: { id: alunoId },
      relations: ['grade', 'grade.materia_grade', 'grade.materia_grade.materia', 'grade.materia_grade.nota'],
    });
  }
}