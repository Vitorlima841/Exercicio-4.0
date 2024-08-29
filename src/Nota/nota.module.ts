import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from '../Aluno/aluno.entity';
import { AlunoController } from '../Aluno/alunoController';
import { AlunoService } from '../Aluno/aluno.service'; // Importe a entidade Materia

@Module({
  imports: [
    TypeOrmModule.forFeature([Aluno]), // Registre a entidade Materia
  ],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class NotaModule {}
