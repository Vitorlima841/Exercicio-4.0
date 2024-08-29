import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { MateriaService } from '../src/materiaEscolar/materia.service';
import { MateriaController } from '../src/materiaEscolar/materiaController';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Materia } from '../src/materiaEscolar/materia.entity';
import { Repository } from 'typeorm';

// Mock para o repositório
const mockMateriaRepository = {
  save: jest.fn().mockResolvedValue({
    status: true,
    mensagem: 'Materia cadastrada!',
  }),
  // Adicione outros métodos do repositório que você está usando nos seus testes, se necessário.
};

describe('Materia Controller (e2e)', () => {
  let app: INestApplication;
  let materiaController: MateriaController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MateriaController],
      providers: [
        MateriaService,
        {
          provide: getRepositoryToken(Materia), // Fornecendo o repositório com o token correto
          useValue: mockMateriaRepository, // Usando o mock do repositório
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    materiaController = moduleFixture.get<MateriaController>(MateriaController);
  });

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

  afterAll(async () => {
    await app.close();
  });
});
