import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './Interceptor/auth.interceptor';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() postData:object){    
    console.log(postData);
    
   return await this.authService.login(postData)
  }

  @Post('create')
  @UseInterceptors(AuthInterceptor)
  async createAuth(@Body() postData:object){    
    await this.authService.createAuth(postData)
  }

}