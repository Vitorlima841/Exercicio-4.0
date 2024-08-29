import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'user',
        password: 'Scarlait0577_@!',
        database: 'escola',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true,
      });

      return dataSource.initialize();
    },
  },
];
