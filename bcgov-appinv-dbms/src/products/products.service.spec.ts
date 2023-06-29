import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Products_Service } from './products.service';

describe('Products_Service', () => {
  let service: Products_Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, Products_Service],
    }).compile();

    service = module.get<Products_Service>(Products_Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
