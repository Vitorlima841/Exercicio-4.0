import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('aluno')
export class AlunoController{
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async cadastrarAluno(@Body()data: AlunoCadastrarDto): Promise<ResultadoDto>{
    return this.alunoService.cadastrarAluno(data)
  }//teste

  @Get('ordenados')
  async AlunosOrdenados() {
    return this.alunoService.AlunosOrdenados();
  }

  @Get('')
  async Historicos() {
    return this.alunoService.Historicos();
  }

  @Get('/:id')
  async HistoricoId(@Param('id') id: number) {
    return this.alunoService.HistoricoId(id);
  }
}
