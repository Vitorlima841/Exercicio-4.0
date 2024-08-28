import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // ajuste o caminho conforme necessário
import { getRepositoryToken } from '@nestjs/typeorm';
import { Aluno } from '../src/Aluno/aluno.entity'; // ajuste o caminho conforme necessário
import { Repository } from 'typeorm';

describe('AlunoController (e2e)', () => {
  let app: INestApplication;
  let alunoRepository: Repository<Aluno>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    alunoRepository = moduleFixture.get<Repository<Aluno>>(getRepositoryToken(Aluno));
  });

  it('GET /mostrarAlunoID/:id should return aluno by ID', async () => {
    // Crie um aluno para teste
    const aluno = await alunoRepository.save({
      nome: 'João',
      idade: 20,
      // outros campos necessários
    });

    // Envie a solicitação GET
    const response = await request(app.getHttpServer())
      .get(`/mostrarAlunoID/${aluno.id}`)
      .expect(200);

    // Verifique a resposta
    expect(response.body).toEqual({
      id: aluno.id,
      nome: aluno.nome,
      idade: aluno.idade,
      // outros campos esperados
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
