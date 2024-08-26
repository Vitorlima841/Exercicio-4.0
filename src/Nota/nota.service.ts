import { Injectable, Inject } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { AlunoCadastrarDto } from '../Aluno/dto/aluno.cadastrar.dto';

@Injectable()
export class NotaService {
  constructor(
    @Inject('NOTA_REPOSITORY')
    private notaRepository: Repository<Nota>,
  ) {}

  async mostrarNotas(): Promise<Nota[]> {
    return this.notaRepository.find();
  }

  async lancarNota(data: NotaCadastrarDto): Promise<ResultadoDto> {
    const nota = new Nota();
    nota.id = data.id;
    nota.valor = data.valor;
    nota.verificaConcluir = data.verificaConcluir;
    nota.materia_grade = data.materia_grade;

    const count = await this.notaRepository.count({
      where: {
        valor: MoreThan(80),
        materia_grade: {
          id: data.materia_grade.id // Supondo que `materia_grade` é um objeto com um `id`
        }
      }
    });

    console.log(count)

    nota.verificaConcluir = count >= 2;

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
          mensagem: 'Nota não cadastrada' + error,
        };
      });
  }
}
