import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MateriaService } from '../src/materiaEscolar/materia.service';
import { Materia } from '../src/materiaEscolar/materia.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Materia Controller (e2e)', () => {
  let app: INestApplication;
  let materiaService: MateriaService;
  let materiaRepository: Repository<Materia>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    materiaService = moduleFixture.get<MateriaService>(MateriaService);
    materiaRepository = moduleFixture.get<Repository<Materia>>(getRepositoryToken(Materia));
  });

  afterEach(async () => {
    // Clean up database after each test
    if (materiaRepository) {
      await materiaRepository.query('DELETE FROM materia'); // Adjust based on your database
    }
  });

  it('/POST /materia/cadastrarMateria should create a materia', async () => {
    const createMateriaDto = { nome: 'Matematica' };

    return request(app.getHttpServer())
      .post('/materia/cadastrarMateria') // Ajuste aqui para coincidir com o controlador
      .send(createMateriaDto)
      .expect(201)
      .expect(({ body }) => {
        expect(body.status).toBe(true);
        expect(body.mensagem).toBe('Materia cadastrada!');
      });
  });

  it('/POST /materia/cadastrarMateria should fail with invalid data', async () => {
    const invalidDto = { nome: '' }; // Assuming nome should not be empty

    return request(app.getHttpServer())
      .post('/materia/cadastrarMateria') // Ajuste aqui para coincidir com o controlador
      .send(invalidDto)
      .expect(400) // Adjust the status code based on your error handling
      .expect(({ body }) => {
        expect(body.status).toBe(false);
        expect(body.mensagem).toBe('Materia não cadastrada');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
