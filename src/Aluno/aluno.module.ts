import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { alunoProviders } from './aluno.providers';
import { AlunoService } from './aluno.service';
import { AlunoController } from './alunoController';

@Module({
  imports: [DatabaseModule],
  controllers: [AlunoController],
  providers: [
    ...alunoProviders,
    AlunoService,
  ],
})
export class AlunoModule {}