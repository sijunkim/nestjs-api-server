import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [MoviesModule, UserModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
