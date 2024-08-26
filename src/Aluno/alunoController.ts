import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.entity';
import { AlunoCadastrarDto } from './dto/aluno.cadastrar.dto';
import { ResultadoDto } from '../dto/resultado.dto';
import { AlunoModule } from './aluno.module';
import { HistoricoAlunoDTO} from './dto/Hitorico.Aluno.dto';

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
  async getTodosHistoricos(): Promise<{
    nome: string;
    id: number;
    grade: {
      id: number;
      materia: {
        nota: {
          valor: number[]; id: number; verificaConcluir: boolean
        }[];
        nome: string; id: number
      }[]
    }[]
  }[]> {
    return this.alunoService.getHistoricoAluno();
  }

  @Get('historico/:id')
  async getHistoricoAlunoID(@Param('id') id: number) {
    return this.alunoService.getHistoricoAlunoID(id);
  }
}