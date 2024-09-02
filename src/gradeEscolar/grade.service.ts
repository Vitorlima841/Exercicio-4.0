import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';
import { materia_gradeProviders } from '../materias_grade/materia_grade.providers';
import { Materia_grade } from '../materias_grade/materia_grade.entity';
import { Aluno } from '../Aluno/aluno.entity';

@Injectable()
export class GradeService {

  constructor(
    @InjectRepository(Grade)
    private gradeRepository: Repository<Grade>,

    @InjectRepository(Materia_grade)
    private materia_gradeRepository: Repository<Materia_grade>,

    @InjectRepository(Aluno)
    private alunoRepository: Repository<Aluno>,
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

    // Busca o aluno com o alunoId passado no parâmetro
    const aluno = await this.alunoRepository
      .createQueryBuilder('aluno')
      .where('aluno.id = :alunoId', { alunoId: data.aluno })
      .getOne();

    // Busca todas as grades do alunoId passado no parâmetro
    const gradesExistentes = await this.gradeRepository
      .createQueryBuilder('grade')
      .where('grade.alunoId = :alunoId', { alunoId: aluno.id })
      .getMany();

    for (const grade1 of gradesExistentes) {
      // Busca todas as materia_grades de todas as grades do alunoId passado no parâmetro
      const materia_gradesExistentes = await this.materia_gradeRepository
        .createQueryBuilder('materia_grade')
        .leftJoinAndSelect('materia_grade.materia', 'materia')
        .leftJoinAndSelect('materia_grade.grade', 'grade')
        .andWhere('materia_grade.grade = :gradeId', {gradeId: grade1.id })
        .getMany();

      for (const materia_grade1 of materia_gradesExistentes) {
        for (const materia2 of materias) {
          if(materia_grade1.materia.id === Number(materia2)){
            throw new BadRequestException(`A matéria ${materia_grade1.materia.nome} já está cadastrada para o aluno.`);
          }
        }
      }
    }

    grade.aluno = data.aluno;

    for (let i = 0; i < materias.length; i++) {
      const materia = materias[i];

      // Criar a nova Materia_grade
      let mg = new Materia_grade();
      mg.grade = grade;
      mg.materia = materia;
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
        mensagem: "Grade não cadastrada: " + error.message
      };
    }
  }
}