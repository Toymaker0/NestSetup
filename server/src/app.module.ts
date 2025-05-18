import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { DbProvider } from './Database/db';
import { UserModule } from './module/user/user.module';
import { InitiateModule } from './module/initiate/initiate.module';
import { McrudModel } from './module/cmn/mcrudModel';
import { UnitsModule } from './module/units/units.module';
import { ProductModule } from './module/product/product.module';

@Module({
  imports: [AuthModule, UserModule, InitiateModule, UnitsModule, ProductModule],
  controllers: [AppController],
  providers: [AppService,DbProvider,McrudModel],
})
export class AppModule {}
