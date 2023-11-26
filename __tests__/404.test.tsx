import { render, screen } from '@testing-library/react';
import NotFoundPage from '../pages/404';
import '@testing-library/jest-dom';

test('displays 404 page for invalid route', async () => {
  render(<NotFoundPage />);

  expect(screen.getByText(/not found/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.queryByText('Some other text')).toBeNull();
});
