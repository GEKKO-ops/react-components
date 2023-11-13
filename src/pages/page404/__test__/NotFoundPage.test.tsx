import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import '@testing-library/jest-dom';

test('displays 404 page for invalid route', () => {
  render(
    <Router>
      <Routes>
        <Route
          path="/*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Router>
  );

  window.history.pushState({}, 'Test page', '/invalid-route');
  expect(screen.getByRole('img')).toBeInTheDocument();
});
