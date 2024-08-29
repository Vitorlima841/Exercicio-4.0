import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AlunoService } from '../src/Aluno/aluno.service';
import { AlunoController } from '../src/Aluno/alunoController';
import { MateriaService } from '../src/materiaEscolar/materia.service';
import { MateriaController } from '../src/materiaEscolar/materiaController';
import { INestApplication } from '@nestjs/common';
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
};

const mockNotaRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'Nota cadastrada!',
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
    it('/POST /aluno/cadastrarAluno should create an aluno', async () => {
      const createAlunoDto = { nome: 'João', grade: 1 };

      await request(app.getHttpServer())
        .post('/aluno/cadastrarAluno')
        .send(createAlunoDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Aluno cadastrado');
        });
    });

    it('/GET /aluno/historico deveria mostrar o histórico de todos os alunos', async () => {
      await request(app.getHttpServer())
        .get('/aluno/historico')
        .expect(200)
        .expect(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    });

    it('/GET /aluno/historico/:id deveria mostrar o histórico do aluno com ID especificado', async () => {
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
    it('/POST /materia/cadastrarMateria should create a materia', async () => {
      const createMateriaDto = { nome: 'Matematica' };

      await request(app.getHttpServer())
        .post('/materia/cadastrarMateria')
        .send(createMateriaDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Materia cadastrada!');
        });
    });
  });

  describe('Grade Controller', () => {
    it('/POST /Grade/cadastrarGrade should create a materia', async () => {
      const createGradeDto = {
        id: 1,
        aluno: 'vitor',
        materia_grade: [1, 2, 3, 4, 5],
      };

      await request(app.getHttpServer())
        .post('/Grade/cadastrarGrade')
        .send(createGradeDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Grade cadastrada!');
        });
    });
  });

  describe('Nota Controller', () => {
    it('/POST /Nota/lancarNota should handle nota creation and validation', async () => {
      const createNotaDto = {
        valor: 87,
        materia_grade: 1,
      };

      await request(app.getHttpServer())
        .post('/Nota/lancarNota')
        .send(createNotaDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Nota cadastrada!');
        });
    });

    it('/POST /Nota/lancarNota should handle validation and deletion of notas', async () => {
      // Primeiro, cria notas que violam a regra
      const nota1 = { valor: 75, materia_grade: 1 };
      const nota2 = { valor: 82, materia_grade: 1 };
      const nota3 = { valor: 79, materia_grade: 1 };

      // Cria as notas com valores que devem levar à exclusão
      await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota1).expect(201);
      await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota2).expect(201);
      await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota3).expect(201);
      await request(app.getHttpServer()).post('/Nota/lancarNota').send(nota2).expect(401); // Espera erro devido à exclusão

      // Verifica se a resposta indica exclusão e erro
      await request(app.getHttpServer())
        .post('/Nota/lancarNota')
        .send({ valor: 90, materia_grade: 1 })
        .expect(400)
        .expect(({ body }) => {
          expect(body.status).toBe(false);
          expect(body.mensagem).toBe('Existem notas menores que 80. Todas as notas foram deletadas e é necessário reiniciar as notas para essa matéria.');
        });
    });
  });

  describe('Materia_grade Controller', () => {
    it('/POST /Materia_grade/cadastrarMateria_grade should create a materia', async () => {
      const createMateriaGradeDto = {
        id: 1,
        grade: { aluno: 'Vitor ' },
        materia: { nome: 'Matematica' },
      };

      await request(app.getHttpServer())
        .post('/Materia_grade/cadastrarMateria_grade')
        .send(createMateriaGradeDto)
        .expect(201)
        .expect(({ body }) => {
          expect(body.status).toBe(true);
          expect(body.mensagem).toBe('Materia_grade cadastrada!');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
