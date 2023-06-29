import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Health_Module } from './health/health.module';
import { Products_Module } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Health_Module,
    Products_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
