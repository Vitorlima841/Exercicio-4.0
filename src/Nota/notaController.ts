import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotaService } from './nota.service';
import { Nota } from './nota.entity';
import { NotaCadastrarDto } from './dto/nota.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('nota')
export class NotaController{
  constructor(private readonly notaService: NotaService) {}

  @Get('mostrarNotas')
  async mostrarNotas(): Promise<Nota[]>{
    return this.notaService.mostrarNotas()
  }

  @Post('lancarNota')
  async lancarNota(@Body()data: NotaCadastrarDto): Promise<ResultadoDto>{
    console.log(data)
    return this.notaService.lancarNota(data)
  }


}