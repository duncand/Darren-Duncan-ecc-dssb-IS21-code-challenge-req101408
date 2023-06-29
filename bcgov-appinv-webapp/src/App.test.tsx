import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders Province of British Columbia Application Inventory (BCGOV-APPINV) title', () => {
  render(<App />);
  const linkElement = screen.getByText('Province of British Columbia Application Inventory (BCGOV-APPINV)');
  expect(linkElement).toBeInTheDocument();
});
