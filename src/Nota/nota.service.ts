import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { Aluno } from '../Aluno/aluno.entity';
import { Grade } from '../gradeEscolar/grade.entity';

@Injectable()
export class NotaService {

  constructor(
    @InjectRepository(Nota)
    private notaRepository: Repository<Nota>,

    @InjectRepository(Materia_grade)
    private materia_gradeRepository: Repository<Materia_grade>,

    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,

    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,
  ) {}

  async lancarNota(data: NotaCadastrarDto): Promise<ResultadoDto> {
    const aluno = await this.alunoRepository.findOne({
      where: { id: Number(data.aluno) },
    });

    if(!aluno){
      throw new NotFoundException('Nenhum aluno encontrado.');
    }

    const grade = await this.gradeRepository.find({
      where: { aluno: aluno },
    });

    if(!grade || grade.length === 0){
      throw new NotFoundException('Nenhuma grade encontrada.');
    }

    const materiaGrades = await this.materia_gradeRepository
      .createQueryBuilder('materia_grade')
      .where('materia_grade.materia = :materiaId', { materiaId: data.materia })
      .andWhere('materia_grade.grade IN (:...gradeIds)', { gradeIds: grade.map(g => g.id) })
      .getMany();

    if (materiaGrades.length === 0) {
      throw new NotFoundException(`O aluno ${aluno.id} não possui a materia ${data.materia}.`);
    }

    const materiaGradeIds = materiaGrades.map((mg) => mg.id);

    const materiaConcluida = await this.notaRepository
      .createQueryBuilder('nota')
      .where('nota.materia_grade IN (:...materiaGradeIds)', { materiaGradeIds })
      .andWhere('nota.verificaConcluir = :verificaConcluir', {
        verificaConcluir: true,
      })
      .getMany();

    if (materiaConcluida.length > 0) {
      throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.');
    }

    const nota = new Nota();
    nota.valor = data.valor;
    nota.materia_grade = materiaGrades[0];
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
        if (notaExistente.valor < 80 || nota.valor < 80) {
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

        throw new BadRequestException('Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.',);
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
