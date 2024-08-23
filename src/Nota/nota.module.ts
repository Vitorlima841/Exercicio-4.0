import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { notaProviders } from './nota.providers';
import { NotaService } from './nota.service';
import { NotaController } from './notaController';

@Module({
  imports: [DatabaseModule],
  controllers: [NotaController],
  providers: [
    ...notaProviders,
    NotaService,
  ],
})
export class NotaModule {}