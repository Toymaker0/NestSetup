import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbProvider } from 'src/Database/db';

@Module({
  controllers: [AuthController],
  providers: [AuthService,DbProvider], 
})
export class AuthModule {}
