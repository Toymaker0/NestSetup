import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthInterceptor } from './Interceptor/auth.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

   @Post('create')
    @UseInterceptors(AuthInterceptor)
    async createAuth(@Body() postData:object){    
      await this.userService.createUser(postData)
    }
}
