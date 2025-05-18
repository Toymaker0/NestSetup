import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterceptor } from '../user/Interceptor/auth.interceptor';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() postData:object){    
    console.log(postData);
    
   return await this.authService.login(postData)
  }

}