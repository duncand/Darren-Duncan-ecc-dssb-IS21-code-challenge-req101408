import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Products_Module } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Products_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
