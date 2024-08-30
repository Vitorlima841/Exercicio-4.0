import { Injectable, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Materia_grade } from './materia_grade.entity';
import { ResultadoDto } from '../dto/resultado.dto';
import { Materia_gradeCadastrarDto } from './dto/materia_grade.cadastrar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';

@Injectable()
export class Materia_gradeService {

  constructor(
    @InjectRepository(Materia_grade)
    private materia_gradeRepository: Repository<Materia_grade>,
  ) {}

    async mostrarMaterias_grade(): Promise<Materia_grade[]> {
        return this.materia_gradeRepository.find();
    }

    async cadastrarMateria_grade(data: Materia_gradeCadastrarDto): Promise<ResultadoDto>{
        let materia_grade = new Materia_grade()
        materia_grade.materia = data.materia
        materia_grade.grade = data.grade

        return this.materia_gradeRepository.save(materia_grade)
          .then((result) =>{
              return <ResultadoDto>{
                  status: true,
                  mensagem: "Materia_grade cadastrada!"
              }
          })
          .catch((error) =>{
            console.error("Error during save: ", error);
            return <ResultadoDto>{
              status: false,
              mensagem: "Materia_grade não cadastrada"
            }
          })
    }
}