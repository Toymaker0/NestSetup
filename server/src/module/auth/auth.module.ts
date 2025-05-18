import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbProvider } from 'src/Database/db';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Replace with environment variable in real apps
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,DbProvider], 
})
export class AuthModule {}
