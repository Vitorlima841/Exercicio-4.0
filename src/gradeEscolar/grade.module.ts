import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';
import { GradeController } from './gradeController';
import { GradeService } from './grade.service'; // Importe a entidade Materia

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade]), // Registre a entidade Materia
  ],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
