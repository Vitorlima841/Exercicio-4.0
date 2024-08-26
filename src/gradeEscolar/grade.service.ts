import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { Materia_gradeService } from '../materias_grade/materia_grade.service';
import { materia_radeCadastrarDto } from './dto/materia_grade.cadastrar2.dto';

@Injectable()
export class GradeService {
  constructor(
    @Inject('GRADE_REPOSITORY')
    private gradeRepository: Repository<Grade>,
  ) {}


  async mostrarGrades(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async cadastrarGrade(data: GradeCadastrarDto): Promise<ResultadoDto>{
    let grade = new Grade()
    grade.id = data.id
    grade.aluno = data.aluno
    grade.materia_grade = data.materia_grade

    if(grade.materia_grade.length < 5){
      throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
    }

    // this.gradeRepository.update()

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