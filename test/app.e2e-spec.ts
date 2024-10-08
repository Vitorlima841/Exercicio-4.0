import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AlunoService } from '../src/Aluno/aluno.service';
import { AlunoController } from '../src/Aluno/alunoController';
import { MateriaService } from '../src/materiaEscolar/materia.service';
import { MateriaController } from '../src/materiaEscolar/materiaController';
import { BadRequestException, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aluno } from '../src/Aluno/aluno.entity';
import { Materia } from '../src/materiaEscolar/materia.entity';
import { GradeService } from '../src/gradeEscolar/grade.service';
import { Grade } from '../src/gradeEscolar/grade.entity';
import { GradeController } from '../src/gradeEscolar/gradeController';
import { NotaService } from '../src/Nota/nota.service';
import { Nota } from '../src/Nota/nota.entity';
import { NotaController } from '../src/Nota/notaController';
import { Materia_grade } from '../src/materias_grade/materia_grade.entity';
import { Materia_gradeService } from '../src/materias_grade/materia_grade.service';
import { Materia_gradeController } from '../src/materias_grade/materia_gradeController';

const mockAlunoRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'Aluno cadastrado!',
  }),
  find: jest.fn().mockResolvedValue([
    { id: 1, nome: 'João', grade: { materia_grade: { materia: { id: 1, nome: 'Matemática' }, nota: { id: 1, valor: 85, verficaConcluir: false } } } },
  ]),
  findOne: jest.fn().mockResolvedValue([
    { id: 1, nome: 'João', grade: { materia_grade: { materia: { id: 1, nome: 'Matemática' }, nota: { id: 1, valor: 85, verficaConcluir: false } } } },
  ]),
};

const mockMateriaRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'Materia cadastrada!',
  }),
};

const mockGradeRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'Grade cadastrada!',
  }),
  createQueryBuilder: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  getCount: jest.fn(),
  getMany: jest.fn().mockResolvedValue([]),
  delete: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  execute: jest.fn().mockResolvedValue({}),
};

const mockNotaRepository = {
  save: jest.fn().mockImplementation((nota: Nota) => {
    if (typeof nota.valor !== 'number' || nota.valor < 0 || nota.valor > 100) {
      return Promise.reject(new BadRequestException('O valor deve estar entre 0 e 100.'));
    }
    return Promise.resolve(nota);
  }),
  createQueryBuilder: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockResolvedValue([]),
  delete: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  execute: jest.fn().mockResolvedValue({}),
};


const mockMateriaGradeRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'MateriaGrade cadastrada!',
  }),
};

describe('Application E2E Tests', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [
        AlunoController,
        MateriaController,
        GradeController,
        NotaController,
        Materia_gradeController,
      ],
      providers: [
        AlunoService,
        MateriaService,
        GradeService,
        NotaService,
        Materia_gradeService,
        {
          provide: getRepositoryToken(Aluno),
          useValue: mockAlunoRepository,
        },
        {
          provide: getRepositoryToken(Materia),
          useValue: mockMateriaRepository,
        },
        {
          provide: getRepositoryToken(Grade),
          useValue: mockGradeRepository,
        },
        {
          provide: getRepositoryToken(Nota),
          useValue: mockNotaRepository,
        },
        {
          provide: getRepositoryToken(Materia_grade),
          useValue: mockMateriaGradeRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Aluno Controller', () => {
    it('/POST /aluno should create an aluno', async () => {
      const createAlunoDto = { nome: 'João', grade: 1 };

      await request(app.getHttpServer())
        .post('/aluno')
        .send(createAlunoDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Aluno cadastrado');
        });
    });

    it('/GET /aluno deveria mostrar o histórico de todos os alunos', async () => {
      await request(app.getHttpServer())
        .get('/aluno/historico')
        .expect(200)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });

    it('/GET /aluno/:id deveria mostrar o histórico do aluno com ID especificado', async () => {
      const alunoId = 1;

      await request(app.getHttpServer())
        .get(`/aluno/historico/${alunoId}`)
        .expect(200)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });
  });

  describe('Materia Controller', () => {
    it('/POST /materia should create a materia', async () => {
      const createMateriaDto = { nome: 'Matematica' };

      await request(app.getHttpServer())
        .post('/materia')
        .send(createMateriaDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Materia cadastrada!');
        });
    });
  });

  describe('Grade Controller', () => {
    it('/POST /Grade should create a materia', async () => {
      const createGradeDto = {
        id: 1,
        aluno: 1,
        materias: [1, 2, 3, 4, 5],
      };

      await request(app.getHttpServer())
        .post('/Grade')
        .send(createGradeDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Grade cadastrada!');
        });
    });
  });

  describe('Nota Controller', () => {
    it('/POST /Nota should not accept invalid valor', async () => {
      const createNotaDto = {
        valor: 12,
        materia_grade: 1,
      };

      await request(app.getHttpServer())
        .post('/nota')
        .send(createNotaDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe("Nota cadastrada!");
        });
    });

  // it('/POST /Nota/lancarNota should handle validation and deletion of notas', async () => {
  //     const nota1 = { valor: 89, materia_grade: 1 };
  //     const nota2 = { valor: 82, materia_grade: 1 };
  //     const nota3 = { valor: 86, materia_grade: 1 };
  //     const nota4 = { valor: 87, materia_grade: 1 };
  //
  //     await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota1).expect(201);
  //     await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota2).expect(201);
  //     await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota3).expect(201);
  //     await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota4).expect(400);
  //
  //     await request(app.getHttpServer())
  //       .post('/Nota/lancarNota')
  //       .send({ valor: 90, materia_grade: 1 })
  //       .expect(400)
  //       .expect(({ body }) => {
  //         expect(body.status).toBe(false);
  //         expect(body.mensagem).toBe('O aluno concluiu a matéria com 3 notas acima de 80.');
  //       });
  //   });
  });

  // describe('Materia_grade Controller', () => {
  //   it('/POST /Materia_grade should create a materia', async () => {
  //     const createMateriaGradeDto = {
  //       id: 1,
  //       grade: { aluno: 'Vitor ' },
  //       materia: { nome: 'Matematica' },
  //     };
  //
  //     await request(app.getHttpServer())
  //       .post('/Materia_grade/cadastrarMateria_grade')
  //       .send(createMateriaGradeDto)
  //       .expect(201)
  //       .expect(({ body }) => {
  //         expect(body.status).toBe(true);
  //         expect(body.mensagem).toBe('Materia_grade cadastrada!');
  //       });
  //   });
  // });

  afterAll(async () => {
    await app.close();
  });
});
