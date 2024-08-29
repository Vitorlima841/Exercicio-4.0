import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';

@Injectable()
export class GradeService {

  constructor(
    @InjectRepository(Grade) // Alteração aqui
    private gradeRepository: Repository<Grade>,
  ) {}


  async mostrarGrades(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async cadastrarGrade(data: GradeCadastrarDto): Promise<ResultadoDto>{
    let grade = new Grade()
    grade.aluno = data.aluno
    grade.materia_grade = data.materia_grade

    if(grade.materia_grade.length < 5){
      throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
    }

    return this.gradeRepository.save(grade)
      .then((result) =>{
        return <ResultadoDto>{
          status: true,
          mensagem: "Grade cadastrada!"
        }
      })
      .catch((error) =>{
        return <ResultadoDto>{
          status: false,
          mensagem: "Grade não cadastrada"
        }
      })
  }
}