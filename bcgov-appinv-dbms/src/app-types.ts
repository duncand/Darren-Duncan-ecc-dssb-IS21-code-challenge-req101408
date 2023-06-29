export interface Product_MS_PSID {
  product_name: string;
  product_scrum_master_name: string;
  product_owner_name: string;
  product_developer_names: Array<string>;
  product_start_date: string;
  product_methodology: string;
  product_location: string;
}

export interface Product extends Product_MS_PSID {
  product_sid: string;
}

export const empty_Product_MS_PSID = {
  product_name: '',
  product_scrum_master_name: '',
  product_owner_name: '',
  product_developer_names: [],
  product_start_date: '',
  product_methodology: '',
  product_location: '',
};

export const empty_Product = {
  product_sid: '',
  product_name: '',
  product_scrum_master_name: '',
  product_owner_name: '',
  product_developer_names: [],
  product_start_date: '',
  product_methodology: '',
  product_location: '',
};

export function is_String(given: any): boolean {
  return (typeof given === 'string') && given.trim() === given;
}

export function is_non_empty_String(given: any): boolean {
  return is_String(given) && given !== '';
}

export function is_Product_MS_PSID(given: any): boolean {
  if (typeof given !== 'object') {
    return false;
  }
  if (!given.hasOwnProperty('product_name')
      || !is_non_empty_String(given.product_name)
      || !given.hasOwnProperty('product_scrum_master_name')
      || !is_non_empty_String(given.product_scrum_master_name)
      || !given.hasOwnProperty('product_owner_name')
      || !is_non_empty_String(given.product_owner_name)
      || !given.hasOwnProperty('product_developer_names')
      || !Array.isArray(given.product_developer_names)
      || !given.hasOwnProperty('product_start_date')
      || !is_non_empty_String(given.product_start_date)
      || !given.hasOwnProperty('product_methodology')
      || !is_non_empty_String(given.product_methodology)
      || !given.hasOwnProperty('product_location')
      || !is_non_empty_String(given.product_location)) {
    return false;
  }
  const product_developer_names: Array<any> = given.product_developer_names;
  if (product_developer_names.length < 1 || product_developer_names.length > 5
      || !product_developer_names.every((maybe_dev_name) => is_non_empty_String(maybe_dev_name))) {
    return false;
  }
  return true;
}

export function is_Product_S_PSID(given: any): boolean {
  return is_Product_MS_PSID(given)
    && Object.keys(given).length === 7;
}

export function is_Product(given: any): boolean {
  return is_Product_MS_PSID(given)
    && Object.keys(given).length === 8
    && given.hasOwnProperty('product_sid')
    && is_non_empty_String(given.product_sid);
}

export function is_Array_of_Product(given: any): boolean {
  return (Array.isArray(given)
    && given.every((maybe_Product) => is_Product(maybe_Product)));
}

export function all_product_sid_are_distinct(products: Array<Product>): boolean {
  const product_sids = products.map((product) => product.product_sid);
  return ((new Set(product_sids)).size === product_sids.length);
}

export function is_Products(given: any): boolean {
  return is_Array_of_Product(given)
    && all_product_sid_are_distinct(given);
}

export function maybe_index_of_matching_Product(
    products: Array<Product>, product_sid: string)
    : number {
  return products.findIndex((product) => product.product_sid === product_sid);
}

export function Product_at_index(products: Array<Product>, index: number): Product {
  // We assume Product_at_index() is called exclusively on inputs
  // for which maybe_index_of_matching_Product() had a successful find.
  return products.at(index) ?? empty_Product;
}

export function generate_distinct_product_sid(products: Array<Product>): string {
  // We will use a simple generator algorithm, that takes the rounded
  // result of multiplying the current UNIX timestamp in milliseconds
  // by a pseudo-random number, then modulo 2^16 so its easier to read,
  // to generate a product_sid.
  // As a guard for the tiny possibility of a collision with
  // an existing product_sid, in the event of a collision we will
  // append an "x" repeatedly until there isn't a collision.
  var product_sid: string
    = (Math.floor(Date.now() * Math.random()) % (2**16)).toString();
  while (maybe_index_of_matching_Product(products, product_sid) !== -1) {
    product_sid = product_sid + 'x';
  }
  return product_sid;
}

export function generic_filtered_Products(products: Array<Product>, search_for: string): Array<Product> {
  return (search_for === '') ? products : products.filter((product) =>
       product.product_sid.includes(search_for)
    || product.product_name.includes(search_for)
    || product.product_scrum_master_name.includes(search_for)
    || product.product_owner_name.includes(search_for)
    || product.product_developer_names.some((dev_name) => dev_name.includes(search_for))
    || product.product_start_date.includes(search_for)
    || product.product_methodology.includes(search_for)
    || product.product_location.includes(search_for)
  );
}
