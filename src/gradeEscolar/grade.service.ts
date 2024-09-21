import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { GradeCadastrarDto } from './dto/grade.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from '../materiaEscolar/materia.entity';
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

    @InjectRepository(Materia)
    private materiaRepository: Repository<Materia>,
  ) {}//afsdf


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

    const materiaIds = await this.materiaRepository.find({
      where: {
        id: In(data.materias)
      }
    });

    if (materiaIds.length !== data.materias.length) {
      throw new BadRequestException('Algumas matérias fornecidas não são válidas.');
    }

    const aluno = await this.alunoRepository.findOne({
      where: {id: Number(data.aluno)}
    })

    if(!aluno){
      throw new NotFoundException('Aluno não encontrado.');
    }

    const gradesAluno = await this.gradeRepository.find({
      where: { aluno: aluno },
    });

    if(gradesAluno.length > 0){
      const countMaterias = await this.materia_gradeRepository
        .createQueryBuilder('materia_grade')
        .leftJoin('materia_grade.materia', 'materia')
        .where('materia_grade.grade IN (:...gradeIds)', { gradeIds: gradesAluno.map(g => g.id) })
        .andWhere('materia_grade.materia IN (:...materiaIds)', { materiaIds: materiaIds.map(m => m.id) })
        .getCount();

      if (countMaterias > 0) {
        throw new BadRequestException(`${countMaterias} matérias já estão cadastradas para o aluno.`);
      }
    }

    grade.aluno = data.aluno;

    for (let i = 0; i < materias.length; i++) {
      const materia = materias[i];
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