import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

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
    grade.aluno = data.aluno_id
    grade.materias = data.materias
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