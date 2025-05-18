import { Controller, Get, Post } from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) { }

  @Get('/get')
  public async getUnits() {
    try {
      return await this.unitsService.getUnits()
    } catch (error) {

    }
  }
}
