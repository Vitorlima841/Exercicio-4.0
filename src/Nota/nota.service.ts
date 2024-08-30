import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Injectable()
export class NotaService {

  constructor(
    @InjectRepository(Nota)
    private notaRepository: Repository<Nota>,

    @InjectRepository(Materia_grade)
    private materia_gradeRepository: Repository<Materia_grade>,
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
    // Busca todas as MateriaGrade associadas à materia passada no parâmetro
    const materiaGrades = await this.materia_gradeRepository
      .createQueryBuilder('materia_grade')
      .where('materia_grade.materia = :materiaId', { materiaId: data.materia })
      .getMany();

    // Verifica se existe alguma MateriaGrade associada à materia
    if (materiaGrades.length === 0) {
      throw new BadRequestException('Nenhuma MateriaGrade associada a essa matéria.');
    }

    // Verifica se já existe alguma nota para as materia_grades encontradas
    const materiaGradeIds = materiaGrades.map((mg) => mg.id);

    // Verifica se a matéria foi concluída com 3 notas acima de 80
    const materiaConcluida = await this.notaRepository
      .createQueryBuilder('nota')
      .where('nota.materia_grade IN (:...materiaGradeIds)', {
        materiaGradeIds,
      })
      .andWhere('nota.verificaConcluir = :verificaConcluir', {
        verificaConcluir: true,
      })
      .getMany();

    if (materiaConcluida.length > 0) {
      throw new BadRequestException(
        'O aluno concluiu a matéria com 3 notas acima de 80.',
      );
    }

    // Cria e salva a nova nota
    const nota = new Nota();
    nota.valor = data.valor;
    nota.materia_grade = materiaGrades[0]; // Associa a primeira MateriaGrade encontrada
    nota.verificaConcluir = false;

    const todasNotas = await this.notaRepository
      .createQueryBuilder('nota')
      .where('nota.materia_grade IN (:...materiaGradeIds)', {
        materiaGradeIds,
      })
      .getMany();

    if (todasNotas.length >= 2) {
      let hasNotaMenorQue80 = false;

      for (const notaExistente of todasNotas) {
        if (notaExistente.valor < 80 || (nota.valor < 80 && todasNotas.length < 3)) {
          hasNotaMenorQue80 = true;
          break;
        }
      }

      if (hasNotaMenorQue80) {
        await this.notaRepository
          .createQueryBuilder()
          .delete()
          .from(Nota)
          .where('materia_grade IN (:...materiaGradeIds)', {
            materiaGradeIds,
          })
          .execute();

        throw new BadRequestException(
          'Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.',
        );
      }

      nota.verificaConcluir = true;
    }

    return this.notaRepository
      .save(nota)
      .then(() => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Nota cadastrada!',
          result: nota,
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
