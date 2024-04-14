import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  isDevelopment() {
    return this.getValue('NODE_ENV', false) === 'local';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    console.log(this.getValue('DATABASE_HOST'));
    console.log(this.getValue('DATABASE_PORT'));
    console.log(this.getValue('DATABASE_USERNAME'));
    console.log(this.getValue('DATABASE_PASSWORD'));
    console.log(this.getValue('DATABASE_NAME'));

    return {
      type: 'mysql',
      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USERNAME'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      // synchronize: Boolean(this.getValue('DATABASE_SYNCHRONIZE')),
      // logging: Boolean(this.getValue('DATABASE_LOGGING')),
      migrationsTableName: 'migrations',
      migrations: ['src/migration/*.ts'],
    };
  }
}
