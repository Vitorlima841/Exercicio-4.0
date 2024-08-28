import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from '../src/Aluno/aluno.entity';
import { AlunoService } from '../src/Aluno/aluno.service';
import { AlunoController } from '../src/Aluno/alunoController';

@Module({
  imports: [TypeOrmModule.forFeature([Aluno])],
  providers: [AlunoService],
  controllers: [AlunoController],
})
export class TestModule {}
