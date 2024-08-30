import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importar o TypeOrmModule

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'user',
            password: 'Scarlait0577_@!',
            database: 'escola',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            //dropSchema: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
