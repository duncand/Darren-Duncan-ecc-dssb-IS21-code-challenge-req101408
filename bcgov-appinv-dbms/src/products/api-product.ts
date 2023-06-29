import { ApiProperty } from '@nestjs/swagger';

import { Product } from '../app-types';

export class API_Product implements Product {
  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: '12345',
  })
  product_sid: string;

  // The remaining properties below this line are exact clones of those
  // declared in API_Product_S_PSID.  An earlier version of this class
  // instead had these:
  //   import { PartialType } from '@nestjs/mapped-types';
  //   export class API_Product extends PartialType(API_Product_S_PSID)
  // However, this was changed to the current method so that Swagger can
  // properly pick up on all the members of API_Product.

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'The Project With No Name',
  })
  product_name: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'John Doe',
  })
  product_scrum_master_name: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'Jane Doe',
  })
  product_owner_name: string;

  @ApiProperty({
    type: Array,
    minLength: 1,
    required: true,
    example: ['Larry', 'Curly', 'Moe'],
  })
  product_developer_names: Array<string>;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: '2023/03/31',
  })
  product_start_date: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'Waterfall',
  })
  product_methodology: string;

  @ApiProperty({
    type: String,
    minLength: 1,
    required: true,
    example: 'http://example.com',
  })
  product_location: string;
}
