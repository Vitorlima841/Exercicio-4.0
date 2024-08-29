import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia_grade } from './materia_grade.entity';
import { Materia_gradeController } from './materia_gradeController';
import { Materia_gradeService } from './materia_grade.service'; // Importe a entidade Materia

@Module({
    imports: [
        TypeOrmModule.forFeature([Materia_grade]), // Registre a entidade Materia
    ],
    controllers: [Materia_gradeController],
    providers: [Materia_gradeService],
})
export class Materia_gradeModule {}
