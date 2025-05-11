import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbManageService } from './module/Initiate-module/db-manage/db-manage.service';
import * as cors from 'cors';

let db = new DbManageService()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4444);
  db.authenticateConnection()
}
bootstrap();
