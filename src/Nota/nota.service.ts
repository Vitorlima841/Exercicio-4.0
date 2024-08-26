import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
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
