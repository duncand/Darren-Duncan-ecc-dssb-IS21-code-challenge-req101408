import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Products_Service } from './products.service';
import { Products_Controller } from './products.controller';

@Module({
  imports: [ConfigModule],
  controllers: [Products_Controller],
  providers: [Products_Service]
})
export class Products_Module {}
