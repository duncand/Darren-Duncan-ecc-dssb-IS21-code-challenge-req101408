import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Products_Controller } from './products.controller';
import { Products_Service } from './products.service';

describe('Products_Controller', () => {
  let controller: Products_Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Products_Controller],
      providers: [ConfigService, Products_Service],
    }).compile();

    controller = module.get<Products_Controller>(Products_Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
