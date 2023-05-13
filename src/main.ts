import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from './config/config.service';
import * as fs from 'fs';
import { AuthGuard } from './app.guard';
// import { setupSwagger } from './src/util/swagger';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // await makeOrmConfig();

  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthGuard());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT);
}

// async function makeOrmConfig() {
//   const configService = new ConfigService(process.env);
//   const typeormConfig = configService.getTypeOrmConfig();

//   if (fs.existsSync('ormconfig.json')) {
//     fs.unlinkSync('ormconfig.json');
//   }

//   fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
// }

bootstrap();
