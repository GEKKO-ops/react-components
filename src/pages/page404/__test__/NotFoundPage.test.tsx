import { render, screen } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import '@testing-library/jest-dom';

test('displays 404 page for invalid route', async () => {
  render(
    <MemoryRouter initialEntries={['/invalid-route']}>
      <Routes>
        <Route
          path="/*"
          element={<NotFoundPage />}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
