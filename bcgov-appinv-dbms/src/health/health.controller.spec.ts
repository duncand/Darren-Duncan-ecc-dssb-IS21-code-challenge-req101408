import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Health_Controller } from './health.controller';
import { Products_Service } from '../products/products.service';

describe('Health_Controller', () => {
  let controller: Health_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Health_Controller],
      providers: [ConfigService, Products_Service],
    }).compile();

    controller = module.get<Health_Controller>(Health_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
