import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { AlunoModule } from './aluno.module';
import { HistoricoAlunoDto } from './dto/Hitorico.Aluno.dto';

@Controller('aluno')
export class AlunoController{
  constructor(private readonly alunoService: AlunoService) {}

  @Get('mostrarAlunos')
  async mostrarAlunos(): Promise<Aluno[]>{
    return this.alunoService.mostrarAlunos()
  }

  @Post('cadastrarAluno')
  async cadastrarAluno(@Body()data: AlunoCadastrarDto): Promise<ResultadoDto>{
    return this.alunoService.cadastrarAluno(data)
  }

  @Get('historico')
  async obterHistoricoTodosAlunos() {
    return this.alunoService.obterHistoricoTodosAlunos();
  }

  @Get('historico/:id')
  async obterHistoricoAlunoID(@Param('id') id: number) {
    return this.alunoService.obterHistoricoAlunoID(id);
  }
}