import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './nota.entity';
import { NotaController } from './notaController';
import { NotaService } from './nota.service'; // Importe a entidade Materia

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]), // Registre a entidade Materia
  ],
  controllers: [NotaController],
  providers: [NotaService],
})
export class NotaModule {}
