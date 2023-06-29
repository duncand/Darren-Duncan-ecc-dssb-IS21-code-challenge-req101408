import {
  Controller, Get,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Products_Service } from '../products/products.service';

@Controller('health')
@ApiTags('health')
export class Health_Controller {
  constructor(private readonly products_service: Products_Service) {}

  @Get()
  @ApiOperation({
    summary: 'Fetch the health status of this API server'
  })
  @ApiOkResponse({
    description: 'The health status of this API server is ok',
  })
  @ApiServiceUnavailableResponse({
    description: 'The health status of this API server is not ok',
  })
  fetch_health() {
    try {
      const products = this.products_service.fetch_all();
    }
    catch (e) {
      throw new ServiceUnavailableException({
        database_is_ok: 'no',
        how_database_not_ok: e.message,
      });
    }
    return { database_is_ok: 'yes' };
  }
}
