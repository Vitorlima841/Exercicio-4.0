import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { materiaProviders } from './materia.providers';
import { MateriaService } from './materia.service';
import { MateriaController } from './materiaController';

@Module({
    imports: [DatabaseModule],
    controllers: [MateriaController],
    providers: [
        ...materiaProviders,
        MateriaService,
    ],
})
    export class MateriaModule {}