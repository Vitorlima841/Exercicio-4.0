import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { AlunoCadastrarDto } from '../Aluno/dto/aluno.cadastrar.dto';
import { Aluno } from '../Aluno/aluno.entity';
import { NotaCadastrar2Dto } from './dto/nota.cadastrar2.dto';

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
    nota.verificaConcluir = data.verificaConcluir;
    nota.materia = data.materia
    nota.grade = data.grade

    const notas = new Nota()



    const todasNotas = await this.notaRepository.createQueryBuilder('nota')
      .where('nota.materia_grade = :materiaGradeId', { materiaGradeId: data.materia_grade })
      .getMany();

    if (todasNotas.length === 2) {
      for (const notaExistente of todasNotas) {
        // Verifica se alguma das notas é menor que 80
        if (notaExistente.valor < 80) {
          // Se existir, deletar todas as notas para essa matéria_grade
          await this.notaRepository.createQueryBuilder('nota')
            .delete()
            .from('nota')
            .where('nota.materiaGradeId = :materiaGradeId', { materiaGradeId: data.materia_grade })
            .execute()
          throw new BadRequestException('Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.');
        }
      }
      // Se não houver notas menores que 80, a matéria é concluída
      nota.verificaConcluir = true;
      throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.');
    }

    if (nota.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }

    return this.notaRepository
      .save(nota)
      .then((result) => {
        return <ResultadoDto>{
          status: true,
          mensagem: 'Nota cadastrada!',
        };
      })
      .catch((error) => {
        return <ResultadoDto>{
          status: false,
          mensagem: 'Nota não cadastrada',
        };
      });
  }
}
