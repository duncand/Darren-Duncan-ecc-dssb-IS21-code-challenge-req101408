import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

import {
  Product,
  Product_MS_PSID,
  all_product_sid_are_distinct,
  generate_distinct_product_sid,
  is_Array_of_Product,
  is_non_empty_String,
  is_Product,
  is_Product_S_PSID,
  maybe_index_of_matching_Product,
  Product_at_index,
} from '../app-types';

@Injectable()
export class Products_Service {
  constructor(private config_service: ConfigService) {
  }

  private config_data_file_path(): string {
    // Get the file system path of the JSON file we will use as our database.
    // We require that file to already exist and be readable and writable.
    // We require the user to specify this path so they have full control
    // over where file system changes are made by this application.
    // Read the value of DATA_FILE_PATH from either the runtime environment
    // or a local ".env" file; its a server error if the user didn't
    // declare either of those for us.
    const maybe_data_file_path = this.config_service.get<string>('DATA_FILE_PATH');
    if (!is_non_empty_String(maybe_data_file_path)) {
      const msg: string = 'Products_Service.config_data_file_path():'
        + ' Environment variable DATA_FILE_PATH must be a non-empty string.';
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    const data_file_path: string = (maybe_data_file_path ?? '').trim();
    console.log('Products_Service.config_data_file_path():'
      + ' DATA_FILE_PATH is "' + data_file_path + '"');
    return data_file_path;
  }

  private read_data_file(): Array<Product> {
    const data_file_path = this.config_data_file_path();
    var data_file_as_Text;
    try {
      data_file_as_Text = fs.readFileSync(data_file_path, 'utf8');
    }
    catch (e) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' failure to read data file as text from "' + data_file_path + '"'
        + ': ' + e;
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    var data_file_as_Any;
    try {
      data_file_as_Any = JSON.parse(data_file_as_Text);
    }
    catch (e) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' failure to parse data file text as JSON from "' + data_file_path + '"'
        + ': ' + e;
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    if (!is_Array_of_Product(data_file_as_Any)) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' data file is not Array of Product from "' + data_file_path + '"';
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    if (!all_product_sid_are_distinct(data_file_as_Any)) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' data file Products not all distinct product_sids'
        + ' from "' + data_file_path + '"';
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    return data_file_as_Any;
  }

  private write_data_file(products: Array<Product>): void {
    const data_file_path = this.config_data_file_path();
    var data_file_as_Text;
    try {
      // Serialize pretty-printed with indentations of 2 spaces per level.
      data_file_as_Text = JSON.stringify(products, null, 2);
    }
    catch (e) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' failure to serialize data file text as JSON to "' + data_file_path + '"'
        + ': ' + e;
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
    try {
      fs.writeFileSync(data_file_path, data_file_as_Text, 'utf8');
    }
    catch (e) {
      const msg: string = 'Products_Service.read_data_file():'
        + ' failure to write data file as text to "' + data_file_path + '"'
        + ': ' + e;
      console.log(msg);
      throw new ServiceUnavailableException(msg);
    }
  }

  create_one(product_MS_PSID: Product_MS_PSID) {
    if (!is_Product_S_PSID(product_MS_PSID)) {
      throw new BadRequestException(
        "request body doesn't match the format of a Product sans product_sid");
    }
    const products: Array<Product> = this.read_data_file();
    const product: Product = {
      "product_sid": generate_distinct_product_sid(products),
      "product_name": product_MS_PSID.product_name,
      "product_scrum_master_name": product_MS_PSID.product_scrum_master_name,
      "product_owner_name": product_MS_PSID.product_owner_name,
      "product_developer_names": product_MS_PSID.product_developer_names,
      "product_start_date": product_MS_PSID.product_start_date,
      "product_methodology": product_MS_PSID.product_methodology,
      "product_location": product_MS_PSID.product_location,
    };
    products.push(product);
    this.write_data_file(products);
  }

  fetch_all(): Array<Product> {
    return this.read_data_file();
  }

  fetch_one(product_sid: string): Product {
    if (!is_non_empty_String(product_sid)) {
      throw new BadRequestException(
        "product_sid (ignoring spaces) isn't a non-empty string");
    }
    const products: Array<Product> = this.read_data_file();
    const may_ind_mat_Prod = maybe_index_of_matching_Product(products, product_sid);
    if (may_ind_mat_Prod === -1) {
      throw new NotFoundException(
        "no Product found matching given product_sid");
    }
    return Product_at_index(products, may_ind_mat_Prod);
  }

  update_one(product_sid: string, product: Product) {
    if (!is_non_empty_String(product_sid)) {
      throw new BadRequestException(
        "product_sid (ignoring spaces) isn't a non-empty string");
    }
    if (!is_Product(product)) {
      throw new BadRequestException(
        "request body doesn't match the format of a Product");
    }
    if (product.product_sid !== product_sid) {
      throw new BadRequestException(
        "product_sids in url and request body don't match");
    }
    const products: Array<Product> = this.read_data_file();
    const may_ind_mat_Prod = maybe_index_of_matching_Product(products, product_sid);
    if (may_ind_mat_Prod === -1) {
      throw new NotFoundException(
        "no Product found matching given product_sid");
    }
    products.splice(may_ind_mat_Prod, 1, product);
    this.write_data_file(products);
  }

  remove_one(product_sid: string) {
    if (!is_non_empty_String(product_sid)) {
      throw new BadRequestException(
        "product_sid (ignoring spaces) isn't a non-empty string");
    }
    const products: Array<Product> = this.read_data_file();
    const may_ind_mat_Prod = maybe_index_of_matching_Product(products, product_sid);
    if (may_ind_mat_Prod === -1) {
      throw new NotFoundException(
        "no Product found matching given product_sid");
    }
    products.splice(may_ind_mat_Prod, 1);
    this.write_data_file(products);
  }
}
