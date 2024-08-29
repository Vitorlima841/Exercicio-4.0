import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';
import { MateriaCadastrarDto } from './dto/materia.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MateriaService {
    // constructor(
    //     @Inject('MATERIA_REPOSITORY')
    //     private materiaRepository: Repository<Materia>,
    // ) {}

    constructor(
      @InjectRepository(Materia) // Alteração aqui
      private materiaRepository: Repository<Materia>,
    ) {}

    async mostrarMaterias(): Promise<Materia[]> {
        return this.materiaRepository.find();
    }

    async cadastrarMateria(data: MateriaCadastrarDto): Promise<ResultadoDto>{
        let materia = new Materia()
        materia.nome = data.nome

        return this.materiaRepository.save(materia)
        .then((result) =>{
            return <ResultadoDto>{
                status: true,
                mensagem: "Materia cadastrada!"
            }
        })
          .catch((error) =>{
              return <ResultadoDto>{
                  status: false,
                  mensagem: "Materia não cadastrada"
              }
          })

    }
}