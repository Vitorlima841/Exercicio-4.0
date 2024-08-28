import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Injectable()
export class NotaService {
  constructor(
    @Inject('NOTA_REPOSITORY')
    private notaRepository: Repository<Nota>,
  ) {}

  async mostrarNotas(): Promise<Nota[]> {
    return this.notaRepository.find();
  }

  async mostrarNotasDoAluno(idAluno: number): Promise<Nota[]> {
    return this.notaRepository
      .createQueryBuilder('nota')
      .innerJoinAndSelect('nota.materia', 'materia')
      .innerJoinAndSelect('nota.grade', 'grade')
      .innerJoinAndSelect('grade.aluno', 'aluno')
      .where('aluno.idteste = :alunoId', { alunoId: idAluno })
      .getMany();
  }

  async lancarNota(data: NotaCadastrarDto): Promise<ResultadoDto> {
    const nota = new Nota();
    nota.valor = data.valor;
    nota.materia_grade = data.materia_grade;
    nota.verificaConcluir = false;

    // Pega todas as notas da materia_grade
    const todasNotas = await this.notaRepository
      .createQueryBuilder('nota')
      .where('nota.materia_grade = :materiaGradeId', {
        materiaGradeId: data.materia_grade,
      })
      .getMany();

    // Verifica se há pelo menos 2 notas já cadastradas
    if (todasNotas.length >= 2) {
      let hasNotaMenorQue80 = false;

      // Verifica se alguma das notas anteriores ou a atual é menor que 80
      for (const notaExistente of todasNotas) {
        if (notaExistente.valor < 80 || nota.valor < 80) {
          hasNotaMenorQue80 = true;
          break;
        }
      }

      if (hasNotaMenorQue80) {
        // Deleta todas as notas para essa materia_grade
        await this.notaRepository
          .createQueryBuilder()
          .delete()
          .from(Nota)
          .where('materia_grade = :materiaGradeId', {
            materiaGradeId: data.materia_grade,
          })
          .execute();

        throw new BadRequestException(
          'Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.',
        );
      }

      // Se não houver notas menores que 80, a matéria é concluída
      nota.verificaConcluir = true;
      if (todasNotas.length !== 2) {
        throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.',);
      }
    }

    // Salvar a nova nota
    return this.notaRepository
      .save(nota)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Nota cadastrada!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Nota não cadastrada: ' + error.message,
        };
      });
  }
}
