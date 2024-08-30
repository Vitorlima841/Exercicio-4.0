import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';

@Injectable()
export class NotaService {

  constructor(
    @InjectRepository(Nota)
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

    const todasNotas = await this.notaRepository
      .createQueryBuilder('nota')
      .where('nota.materia_grade = :materiaGradeId', {
        materiaGradeId: data.materia_grade,
      })
      .getMany();

    if (todasNotas.length >= 2) {
      let hasNotaMenorQue80 = false;

      for (const notaExistente of todasNotas) {
        if (notaExistente.valor < 80 || nota.valor < 80 && todasNotas. length < 3) {
          hasNotaMenorQue80 = true;
          break;
        }
      }

      if (hasNotaMenorQue80) {
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

      nota.verificaConcluir = true;
      if (todasNotas.length !== 2) {
        throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.');
      }
    }

    return this.notaRepository
      .save(nota)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Nota cadastrada!',
          result: nota
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
