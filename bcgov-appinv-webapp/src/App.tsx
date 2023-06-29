import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

import {
  Product,
  Product_MS_PSID,
  empty_Product_MS_PSID,
  is_Product,
  is_Product_S_PSID,
  is_Products,
  generic_filtered_Products,
} from './app-types';

import './App.css';

// Note, for any uses of useEffect(), providing the second "optional" arg
// even if the empty array is necessary to avoid infinite useEffect() calls.

// Note, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
// doesn't exist in the JavaScript version we're using, so work around its absence.
// Also this version will pad missing intermediate elements if there are any.
function Array_toSpliced_one(ary_in: string[], index: number, elem: string): string[] {
  const ary_out: string[] = Array.from(ary_in);
  while ((ary_out.length - 1) < index) {
    ary_out.push('');
  }
  ary_out.splice(index, 1, elem);
  return ary_out;
}

interface Product_CED_Props {
  product_MS_PSID: Product_MS_PSID;
  assign_to__product_MS_PSID: (x: Product_MS_PSID) => void;
  for_display_only: boolean;
}

function dbms_uri_base(): string {
  // Defaults match those of the API server.
  const host = process.env.REACT_APP_DBMS_HOST ?? '127.0.0.1';
  const port = process.env.REACT_APP_DBMS_PORT ?? 80;
  return 'http://'+host+':'+port+'/api';
}

function ViewAllProductsPage() {
  const [is_products_fetch_error, assign_to__is_products_fetch_error] = useState<boolean>(true);
  const [products, assign_to__products] = useState<Array<Product>>([]);
  const [search_for, assign_to__search_for] = useState<string>('');

  useEffect(() => {
    fetch(dbms_uri_base() + '/products')
      .then((response) => {
        if (response.status === 200) {
          assign_to__is_products_fetch_error(false);
          return response.json();
        }
        else {
          assign_to__is_products_fetch_error(true);
        }
      })
      .then((data) => {
        if (!is_Products(data)) {
          assign_to__is_products_fetch_error(true);
        }
        else {
          assign_to__products(data);
        }
      })
      .catch((err) => {
        assign_to__is_products_fetch_error(true);
        console.log(err.message);
      });
  }, []);

  if (is_products_fetch_error) {
    return (
      <p>Failed to fetch products.</p>
    )
  }

  const tableHeading = (
    <tr>
      <th></th>
      <th></th>
      <th>Product Number/SID</th>
      <th>Product Name</th>
      <th>Scrum Master Name</th>
      <th>Product Owner Name</th>
      <th>Developer Names</th>
      <th>Start Date</th>
      <th>Methodology</th>
      <th>Location</th>
    </tr>
  );

  const filtered_products = generic_filtered_Products(products, search_for.trim());

  const tableRows = filtered_products.map((product) =>
    <tr key={product.product_sid}>
      <td><Link to={'/edit/' + product.product_sid}>Edit</Link></td>
      <td><Link to={'/delete/' + product.product_sid}>Delete</Link></td>
      <td>{product.product_sid}</td>
      <td>{product.product_name}</td>
      <td>{product.product_scrum_master_name}</td>
      <td>{product.product_owner_name}</td>
      <td>{product.product_developer_names.join(', ')}</td>
      <td>{product.product_start_date}</td>
      <td>{product.product_methodology}</td>
      <td>{product.product_location}</td>
    </tr>
  );

  return (
    <>
      <p>Showing {filtered_products.length} of {products.length} products.</p>
      <p><Link to={'/create'}>Add</Link> a new product.</p>
      <p>Search For: <input
                type="text"
                id="search_for"
                name="search_for"
                value={search_for}
                onChange={(e) => assign_to__search_for(e.target.value)}
                /></p>
      <table>
        <thead>
          {tableHeading}
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  );
}

function ProductFormSuccessfulSaveInstructions() {
  return (
    <>
      <p>For a successful save:</p>
      <ul>
        <li>All fields must be filled in.</li>
        <li>But only one of the Developer Names fields must be filled in.</li>
      </ul>
    </>
  );
}

function ProductFormFieldsSansProductNumber(
    {
      product_MS_PSID,
      assign_to__product_MS_PSID,
      for_display_only,
    }: Product_CED_Props) {

  if (for_display_only) {
    return (
      <>
        <tr>
          <td>Product Name:</td>
          <td>{product_MS_PSID.product_name}</td>
        </tr>
        <tr>
          <td>Scrum Master Name:</td>
          <td>{product_MS_PSID.product_scrum_master_name}</td>
        </tr>
        <tr>
          <td>Product Owner Name:</td>
          <td>{product_MS_PSID.product_owner_name}</td>
        </tr>
        <tr>
          <td>Developer Names:</td>
          <td>{product_MS_PSID.product_developer_names.join(', ')}</td>
        </tr>
        <tr>
          <td>Start Date:</td>
          <td>{product_MS_PSID.product_start_date}</td>
        </tr>
        <tr>
          <td>Methodology:</td>
          <td>{product_MS_PSID.product_methodology}</td>
        </tr>
        <tr>
          <td>Location:</td>
          <td>{product_MS_PSID.product_location}</td>
        </tr>
      </>
    );
  }

  return (
    <>
      <tr>
        <td>Product Name:</td>
        <td><input
          type="text"
          id="product_name"
          name="product_name"
          value={product_MS_PSID.product_name}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_name: e.target.value })}
          required={true}
          /></td>
      </tr>
      <tr>
        <td>Scrum Master Name:</td>
        <td><input
          type="text"
          id="product_scrum_master_name"
          name="product_scrum_master_name"
          value={product_MS_PSID.product_scrum_master_name}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_scrum_master_name: e.target.value })}
          required={true}
          /></td>
      </tr>
      <tr>
        <td>Product Owner Name:</td>
        <td><input
          type="text"
          id="product_owner_name"
          name="product_owner_name"
          value={product_MS_PSID.product_owner_name}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_owner_name: e.target.value })}
          required={true}
          /></td>
      </tr>
      <tr>
        <td>Developer Names:</td>
        <td><ol>
          {
            [1,2,3,4,5].map((dev_name_number) =>
              <li key={dev_name_number}><input
                type="text"
                id={'product_developer_names_' + dev_name_number}
                name={'product_developer_names_' + dev_name_number}
                value={product_MS_PSID.product_developer_names.at(dev_name_number - 1) || ''}
                onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID,
                  product_developer_names: Array_toSpliced_one(product_MS_PSID.product_developer_names,
                    dev_name_number - 1, e.target.value)
                })}
                required={dev_name_number === 1}
              /></li>
            )
          }
        </ol></td>
      </tr>
      <tr>
        <td>Start Date:</td>
        <td><input
          type="text"
          id="product_start_date"
          name="product_start_date"
          value={product_MS_PSID.product_start_date}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_start_date: e.target.value })}
          required={true}
          /></td>
      </tr>
      <tr>
        <td>Methodology:</td>
        <td><input
          type="text"
          id="product_methodology"
          name="product_methodology"
          value={product_MS_PSID.product_methodology}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_methodology: e.target.value })}
          required={true}
          /></td>
      </tr>
      <tr>
        <td>Location:</td>
        <td><input
          type="text"
          id="product_location"
          name="product_location"
          value={product_MS_PSID.product_location}
          onChange={(e) => assign_to__product_MS_PSID({ ...product_MS_PSID, product_location: e.target.value })}
          required={true}
          /></td>
      </tr>
    </>
  );
}

function normalized_Product_S_PSID(
    product_MS_PSID: Product_MS_PSID): Product_MS_PSID {
  return {
    product_name: product_MS_PSID.product_name.trim(),
    product_scrum_master_name: product_MS_PSID.product_scrum_master_name.trim(),
    product_owner_name: product_MS_PSID.product_owner_name.trim(),
    product_developer_names: product_MS_PSID.product_developer_names
      .map((dev_name) => dev_name.trim()).filter((dev_name) => dev_name !== ''),
    product_start_date: product_MS_PSID.product_start_date.trim(),
    product_methodology: product_MS_PSID.product_methodology.trim(),
    product_location: product_MS_PSID.product_location.trim(),
  };
}

function CreateOneProductPage() {
  const [product_MS_PSID, assign_to__product_MS_PSID]
    = useState<Product_MS_PSID>(empty_Product_MS_PSID);

  function handleProductCreateFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent page from submitting.
    event.preventDefault();
    const norm_product_S_PSID = normalized_Product_S_PSID(product_MS_PSID);
    console.log('save button clicked with '+JSON.stringify(norm_product_S_PSID));
    if (!is_Product_S_PSID(norm_product_S_PSID)) {
      alert('Some fields are not filled correctly, so the form can not be saved.');
      return;
    }
    fetch(dbms_uri_base() + '/products/', {
        method: 'POST',
        body: JSON.stringify(normalized_Product_S_PSID(norm_product_S_PSID)),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert('Changes were saved.');
        }
        else if (response.status === 400) {
          alert('Failed to save changes as bad client request; this shouldn\'t happen.');
        }
        else {
          alert('Something else happened: '+response.status+' '+response.statusText);
        }
      })
      .catch((err) => {
        alert('Failed to save changes: ' + err.message
          + ' see console for details');
        console.log(err.message);
      });
  }

  return (
    <>
      <h2>Add a Product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <ProductFormSuccessfulSaveInstructions/>
      <form onSubmit={handleProductCreateFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Product Number/SID:</td>
              <td>(Will be generated.)</td>
            </tr>
            <ProductFormFieldsSansProductNumber
              product_MS_PSID={product_MS_PSID}
              assign_to__product_MS_PSID={assign_to__product_MS_PSID}
              for_display_only={false}
            />
            <tr>
              <td></td>
              <td><button type="submit">Save Changes</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

function EditOneProductPage() {
  const { product_sid } = useParams();

  const [is_product_fetch_error, assign_to__is_product_fetch_error] = useState<boolean>(true);
  const [product_MS_PSID, assign_to__product_MS_PSID]
    = useState<Product_MS_PSID>(empty_Product_MS_PSID);

  useEffect(() => {
    fetch(dbms_uri_base() + '/products/'+product_sid)
      .then((response) => {
        if (response.status === 200) {
          assign_to__is_product_fetch_error(false);
          return response.json();
        }
        else {
          assign_to__is_product_fetch_error(true);
        }
      })
      .then((data) => {
        if (!is_Product(data)) {
          assign_to__is_product_fetch_error(true);
        }
        else {
          assign_to__product_MS_PSID(data);
        }
      })
      .catch((err) => {
        assign_to__is_product_fetch_error(true);
        console.log(err.message);
      });
  }, [product_sid]);

  if (is_product_fetch_error) {
    return (
      <p>Failed to fetch product.</p>
    )
  }

  function handleProductEditFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent page from submitting.
    event.preventDefault();
    const norm_product_S_PSID = normalized_Product_S_PSID(product_MS_PSID);
    const product: Product = { ...norm_product_S_PSID, product_sid: product_sid ?? '' };
    console.log('save button clicked with '+JSON.stringify(product));
    if (!is_Product(product)) {
      alert('Some fields are not filled correctly, so the form can not be saved.');
      return;
    }
    fetch(dbms_uri_base() + '/products/'+product_sid+'/', {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert('Changes were saved.');
        }
        else if (response.status === 400) {
          alert('Failed to save changes as bad client request; this shouldn\'t happen.');
        }
        else if (response.status === 404) {
          alert('Failed to save changes as product no longer in database.');
        }
        else {
          alert('Something else happened: '+response.status+' '+response.statusText);
        }
      })
      .catch((err) => {
        alert('Failed to save changes: ' + err.message
          + ' see console for details');
        console.log(err.message);
      });
  }

  return (
    <>
      <h2>Edit a Product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <ProductFormSuccessfulSaveInstructions/>
      <form onSubmit={handleProductEditFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Product Number/SID:</td>
              <td>{product_sid}</td>
            </tr>
            <ProductFormFieldsSansProductNumber
              product_MS_PSID={product_MS_PSID}
              assign_to__product_MS_PSID={assign_to__product_MS_PSID}
              for_display_only={false}
            />
            <tr>
              <td></td>
              <td><button type="submit">Save Changes</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

function DeleteOneProductPage() {
  const { product_sid } = useParams();

  const [is_product_fetch_error, assign_to__is_product_fetch_error] = useState<boolean>(true);
  const [product_MS_PSID, assign_to__product_MS_PSID]
    = useState<Product_MS_PSID>(empty_Product_MS_PSID);

  useEffect(() => {
    fetch(dbms_uri_base() + '/products/'+product_sid)
      .then((response) => {
        if (response.status === 200) {
          assign_to__is_product_fetch_error(false);
          return response.json();
        }
        else {
          assign_to__is_product_fetch_error(true);
        }
      })
      .then((data) => {
        if (!is_Product(data)) {
          assign_to__is_product_fetch_error(true);
        }
        else {
          assign_to__product_MS_PSID(data);
        }
      })
      .catch((err) => {
        assign_to__is_product_fetch_error(true);
        console.log(err.message);
      });
  }, [product_sid]);

  if (is_product_fetch_error) {
    return (
      <p>Failed to fetch product.</p>
    )
  }

  function handleProductDeleteFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent page from submitting.
    event.preventDefault();
    console.log('delete button clicked with '+product_sid);
    fetch(dbms_uri_base() + '/products/'+product_sid+'/', {
        method: 'DELETE',
      })
      .then((response) => {
        if (response.status === 200) {
          alert('Product was deleted.');
        }
        else if (response.status === 400) {
          alert('Failed to save changes as bad client request; this shouldn\'t happen.');
        }
        else if (response.status === 404) {
          alert('Failed to save changes as product no longer in database.');
        }
        else {
          alert('Something else happened: '+response.status+' '+response.statusText);
        }
      })
      .catch((err) => {
        alert('Failed to delete product: ' + err.message
          + ' see console for details');
        console.log(err.message);
      });
  }

  return (
    <>
      <h2>Delete a Product</h2>
      <p><Link to={'/'}>Return</Link> to the product listing page.</p>
      <form onSubmit={handleProductDeleteFormSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Product Number/SID:</td>
              <td>{product_sid}</td>
            </tr>
            <ProductFormFieldsSansProductNumber
              product_MS_PSID={product_MS_PSID}
              assign_to__product_MS_PSID={assign_to__product_MS_PSID}
              for_display_only={true}
            />
            <tr>
              <td></td>
              <td><button type="submit">Delete If You're Sure</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <h1>Province of British Columbia Application Inventory (BCGOV-APPINV)</h1>
      <Routes>
        <Route path="/create" element={<CreateOneProductPage />} />
        <Route path="/" element={<ViewAllProductsPage />} />
        <Route path="/edit/:product_sid" element={<EditOneProductPage />} />
        <Route path="/delete/:product_sid" element={<DeleteOneProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
