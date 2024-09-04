import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';

@Controller('aluno')
export class AlunoController{
  constructor(private readonly alunoService: AlunoService) {}

  @Post()
  async cadastrarAluno(@Body()data: AlunoCadastrarDto): Promise<ResultadoDto>{
    return this.alunoService.cadastrarAluno(data)
  }

  @Get('ordenados')
  async obterHistoricoTodosAlunosOrdenados() {
    return this.alunoService.obterHistoricoTodosAlunosOrdenados();
  }

  @Get('')
  async obterHistoricoTodosAlunos() {
    return this.alunoService.obterHistoricoTodosAlunos();
  }

  @Get('/:id')
  async obterHistoricoAlunoID(@Param('id') id: number) {
    return this.alunoService.obterHistoricoAlunoID(id);
  }


}
