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
    nota.id = data.id;
    nota.valor = data.valor;
    nota.verificaConcluir = data.verificaConcluir;
    nota.materia = data.materia
    nota.grade = data.grade

    const notas = new Nota()



    // if (nota.valor >= 80) {
    //   for (let i = 0; i < 3; i++) {
    //     if (nota.maior80[i] == false) {
    //       nota.maior80[i] = true;
    //     }
    //   }
    // }



    // let verificaMaior80 = 0;
    // for (let i = 0; i < nota.valor.length; i++) {
    //   if (nota.valor[i] >= 80) {
    //     verificaMaior80++;
    //   }
    // }
    //
    // if (verificaMaior80 == 3) {
    //   nota.verificaConcluir = true;
    // }

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
