import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './aluno.entity';
import { AlunoController } from './alunoController';
import { AlunoService } from './aluno.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]), // Registre a entidade Materia
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
