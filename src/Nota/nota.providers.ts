import { DataSource } from 'typeorm';
import { Nota } from './nota.entity';

export const notaProviders = [
  {
    provide: 'NOTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Nota),
    inject: ['DATA_SOURCE'],
  },
];