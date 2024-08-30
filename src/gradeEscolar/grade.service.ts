import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';
import { materia_gradeProviders } from '../materias_grade/materia_grade.providers';
import { Materia_grade } from '../materias_grade/materia_grade.entity';

@Injectable()
export class GradeService {

  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,

    @InjectRepository(Materia_grade)
    private materia_gradeRepository: Repository<Materia_grade>,
  ) {}


  async mostrarGrades(): Promise<Grade[]> {
    return this.gradeRepository.find();
  }

  async cadastrarGrade(data: GradeCadastrarDto): Promise<ResultadoDto> {
    let grade = new Grade();
    let materias: Materia[] = data.materias;
    let materia_grade: Materia_grade[] = [];

    if (materias.length < 5) {
      throw new BadRequestException('A grade deve ter no mínimo 5 matérias.');
    }

    grade.aluno = data.aluno;

    for (let i = 0; i < materias.length; i++) {
      let mg = new Materia_grade();
      mg.grade = grade;
      mg.materia = materias[i];
      materia_grade.push(mg);
    }

    try {
      await this.gradeRepository.save(grade);
      await this.materia_gradeRepository.save(materia_grade);

      return <ResultadoDto>{
        status: true,
        mensagem: "Grade cadastrada!",
        result: materia_grade
      };
    } catch (error) {
      return <ResultadoDto>{
        status: false,
        mensagem: "Grade não cadastrada" + error.message
      };
    }
  }

}