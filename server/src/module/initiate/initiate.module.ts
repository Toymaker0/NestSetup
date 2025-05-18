import { Module } from '@nestjs/common';
import { InitiateService } from './initiate.service';
import { InitiateController } from './initiate.controller';
import { McrudModel } from '../cmn/mcrudModel';
import { DbProvider } from 'src/Database/db';

@Module({
  controllers: [InitiateController],
  providers: [InitiateService,McrudModel,DbProvider],
})
export class InitiateModule {}
