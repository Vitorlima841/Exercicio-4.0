import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MateriaModule} from "./materiaEscolar/materia.module";
import { AlunoModule } from './Aluno/aluno.module';
import { GradeModule } from './gradeEscolar/grade.module';
import { NotaModule } from './Nota/nota.module';
import { Materia_gradeModule } from './materias_grade/materia_grade.module';

@Module({
  imports: [
      MateriaModule,
      AlunoModule,
      GradeModule,
      NotaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
