import { Controller, Get, Post } from '@nestjs/common';
import { InitiateService } from './initiate.service';

@Controller('initiate')
export class InitiateController {
  constructor(private readonly initiateService: InitiateService) {}

  @Get('setDb')
  async initiate(){
    try {      
        return await this.initiateService.schemeTable()
    } catch (error) {
      
    }
  }
}
