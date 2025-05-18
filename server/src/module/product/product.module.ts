import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { McrudModel } from '../cmn/mcrudModel';
import { DbProvider } from 'src/Database/db';

@Module({
  controllers: [ProductController],
  providers: [ProductService,McrudModel,DbProvider],
})
export class ProductModule {}
