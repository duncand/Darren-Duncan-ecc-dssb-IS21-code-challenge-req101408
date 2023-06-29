import { ApiProperty } from '@nestjs/swagger';

import { Product_MS_PSID } from '../app-types';

export class API_Product_S_PSID implements Product_MS_PSID {
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
