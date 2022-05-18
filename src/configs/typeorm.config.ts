import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'Larry11physics',
  database: 'classum',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
