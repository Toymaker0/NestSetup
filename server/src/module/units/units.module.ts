import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { McrudModel } from '../cmn/mcrudModel';
import { DbProvider } from 'src/Database/db';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService,McrudModel,DbProvider],
})
export class UnitsModule {}
