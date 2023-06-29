import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Products_Service } from '../products/products.service';
import { Health_Controller } from './health.controller';

@Module({
  imports: [ConfigModule],
  controllers: [Health_Controller],
  providers: [Products_Service]
})
export class Health_Module {}
