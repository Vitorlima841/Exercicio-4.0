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

    //Pega todas as notas da meteria_grade
    const todasNotas = await this.notaRepository.createQueryBuilder('nota')
      .where('nota.materia_grade = :materiaGradeId', { materiaGradeId: data.materia_grade })
      .getMany();

    // So entra no if caso ja tenho 2 notas dentro do banco dedados
<<<<<<< HEAD
    if (todasNotas.length >= 2) {
=======
    if (todasNotas.length === 2) {
>>>>>>> 46d3ef1990ccbbef3bd30bc17bb809581011222c
      let hasNotaMenorQue80 = false;

      for (const notaExistente of todasNotas) {// If é necessário pois estou deixando ele colocar 3 notas, para no final conferir se alguma é menor que 80
        // Verifica se alguma das notas anteriores é menor que 80
        if (notaExistente.valor < 80 || nota.valor < 80) {
          hasNotaMenorQue80 = true;
          break;
        }
      }

      if (hasNotaMenorQue80) {
        // Se existir, deletar todas as notas para essa matéria_grade
        await this.notaRepository.createQueryBuilder('nota')
          .delete()
          .where('nota.materiaGradeId = :materiaGradeId', { materiaGradeId: data.materia_grade })
          .execute();

        throw new BadRequestException('Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.');
      }

      // Se não houver notas menores que 80, a matéria é concluída
<<<<<<< HEAD
      nota.verificaConcluir = true;
      if(todasNotas.length !== 2){
        // Caso tente adicionar mais uma nota em uma materia concluida
        throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.');
      }
    }
=======
      nota.verificaConcluir = true;// Olhar, pois ele esta dando esse erro antes de cadastrar a ultima nota
      await this.notaRepository.save(nota)
      throw new BadRequestException('O aluno concluiu a matéria com 3 notas acima de 80.');
    }

    if (nota.verificaConcluir) {
      throw new BadRequestException('O aluno concluiu a materia.');
    }

>>>>>>> 46d3ef1990ccbbef3bd30bc17bb809581011222c
    // Salvar a nova nota
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
          mensagem: 'Nota não cadastrada: ' + error,
        };
      });
  }

}
