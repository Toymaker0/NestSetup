import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { DbProvider } from './Database/db';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService,DbProvider],
})
export class AppModule {}
