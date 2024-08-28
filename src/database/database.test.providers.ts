import { DataSource } from 'typeorm';

export const testDatabaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'Scarlait0577_@!',
        database: 'teste',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true, // Opcional, para garantir que o esquema seja limpo antes dos testes
      });

      return dataSource.initialize();
    },
  },
];
