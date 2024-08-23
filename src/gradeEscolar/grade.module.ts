import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { gradeProviders } from './grade.providers';
import { GradeService } from './grade.service';
import { GradeController } from './gradeController';

@Module({
  imports: [DatabaseModule],
  controllers: [GradeController],
  providers: [
    ...gradeProviders,
    GradeService,
  ],
})
export class GradeModule {}