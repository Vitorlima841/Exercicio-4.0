import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importar o TypeOrmModule

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql', // O tipo de banco de dados que você está usando
            host: 'localhost', // Host do banco de dados
            port: 3306, // Porta do banco de dados
            username: 'user', // Usuário do banco de dados
            password: 'Scarlait0577_@!', // Senha do banco de dados
            database: 'escola', // Nome do banco de dados
            entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Caminho para as entidades
            synchronize: true, // Não usar em produção - sincroniza as entidades com o banco
        }),
    ],
    exports: [TypeOrmModule], // Exporte o TypeOrmModule
})
export class DatabaseModule {}
