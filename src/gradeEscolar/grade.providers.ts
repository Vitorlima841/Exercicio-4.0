import { DataSource } from 'typeorm';
import { Grade } from './grade.entity';

export const gradeProviders = [
  {
    provide: 'GRADE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Grade),
    inject: ['DATA_SOURCE'],
  },
];