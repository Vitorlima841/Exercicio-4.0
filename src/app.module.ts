import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MateriaModule} from "./materiaEscolar/materia.module";
import { AlunoModule } from './Aluno/aluno.module';
import { GradeModule } from './gradeEscolar/grade.module';
import { NotaModule } from './Nota/nota.module';
import { Materia_gradeModule } from './materias_grade/materia_grade.module';
import { DatabaseModule } from './database/database.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
      DatabaseModule,
      MateriaModule,
      AlunoModule,
      GradeModule,
      NotaModule,
      Materia_gradeModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },],
})//asdasd
export class AppModule {}
