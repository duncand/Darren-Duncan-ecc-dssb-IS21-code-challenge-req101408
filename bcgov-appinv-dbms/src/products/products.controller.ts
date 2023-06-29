import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Products_Service } from './products.service';
import { API_Product_S_PSID } from './api-product-s-psid';
import { API_Product } from './api-product';

@Controller('products')
@ApiTags('products')
export class Products_Controller {
  constructor(private readonly products_service: Products_Service) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new Product with a generated product_sid'
  })
  @ApiCreatedResponse({
    description: 'Created a new Product with a generated product_sid',
  })
  @ApiBadRequestResponse({
    description: 'Given request body is not of a valid format'
  })
  @ApiServiceUnavailableResponse({
    description: 'The Products database is currently unavailable for use',
  })
  create_one(@Body() api_Product_S_PSID: API_Product_S_PSID) {
    return this.products_service.create_one(api_Product_S_PSID);
  }

  @Get()
  @ApiOperation({
    summary: 'Fetch a list of all existing Products'
  })
  @ApiOkResponse({
    description: 'Fetched a list of all existing Products',
  })
  @ApiServiceUnavailableResponse({
    description: 'The Products database is currently unavailable for use',
  })
  fetch_all() {
    return this.products_service.fetch_all();
  }

  @Get(':product_sid')
  @ApiParam({ name: 'product_sid', type: String, required: true })
  @ApiOperation({
    summary: 'Fetch an existing Product matching given product_sid'
  })
  @ApiOkResponse({
    description: 'Fetched an existing Product matching given product_sid'
  })
  @ApiBadRequestResponse({
    description: 'Given product_sid is not of a valid format'
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given product_sid'
  })
  @ApiServiceUnavailableResponse({
    description: 'The Products database is currently unavailable for use',
  })
  fetch_one(@Param('product_sid') product_sid: string): API_Product {
    return this.products_service.fetch_one(decodeURIComponent(product_sid));
  }

  @Put(':product_sid')
  @ApiParam({ name: 'product_sid', type: String, required: true })
  @ApiOperation({
    summary: 'Update an existing Product matching given product_sid'
  })
  @ApiOkResponse({
    description: 'Updated an existing Product matching given product_sid'
  })
  @ApiBadRequestResponse({
    description: 'Given product_sid or request body is not of a valid format'
      + " or product_sids in url and body don't match"
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given product_sid'
  })
  @ApiServiceUnavailableResponse({
    description: 'The Products database is currently unavailable for use',
  })
  update_one(@Param('product_sid') product_sid: string,
      @Body() apiProduct: API_Product) {
    return this.products_service.update_one(
      decodeURIComponent(product_sid), apiProduct);
  }

  @Delete(':product_sid')
  @ApiParam({ name: 'product_sid', type: String, required: true })
  @ApiOperation({
    summary: 'Remove an existing Product matching given product_sid'
  })
  @ApiOkResponse({
    description: 'Removed an existing Product matching given product_sid'
  })
  @ApiBadRequestResponse({
    description: 'Given product_sid is not of a valid format'
  })
  @ApiNotFoundResponse({
    description: 'No Product found matching given product_sid'
  })
  @ApiServiceUnavailableResponse({
    description: 'The Products database is currently unavailable for use',
  })
  remove_one(@Param('product_sid') product_sid: string) {
    return this.products_service.remove_one(decodeURIComponent(product_sid));
  }
}
