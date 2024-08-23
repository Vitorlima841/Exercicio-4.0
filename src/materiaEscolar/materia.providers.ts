import { DataSource } from 'typeorm';
import { Materia } from './materia.entity';

export const materiaProviders = [
    {
        provide: 'MATERIA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Materia),
        inject: ['DATA_SOURCE'],
    },
];