import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importe o TypeOrmModule
import { MateriaService } from './materia.service';
import { MateriaController } from './materiaController';
import { Materia } from './materia.entity'; // Importe a entidade Materia

@Module({
    imports: [
        TypeOrmModule.forFeature([Materia]), // Registre a entidade Materia
    ],
    controllers: [MateriaController],
    providers: [MateriaService],
})
export class MateriaModule {}
