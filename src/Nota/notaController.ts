import { Body, Controller, Post } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('nota')
export class NotaController {
  constructor(private readonly notaService: NotaService) {}

  @Post('')
  async lancarNota(@Body() data: NotaCadastrarDto): Promise<ResultadoDto> {
    return this.notaService.lancarNota(data);
  }
}
