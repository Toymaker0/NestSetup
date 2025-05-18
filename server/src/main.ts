import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DbManageService } from './module/initiate/db-manage.service';
import * as cors from 'cors';
import { InitiateService } from './module/initiate/initiate.service';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4444);

}
bootstrap();
