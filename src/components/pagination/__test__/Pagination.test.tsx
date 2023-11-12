import { render, screen, fireEvent, act } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import Pagination from '../Pagination';
import '@testing-library/jest-dom';

describe('Pagination component', () => {
  const cardPerPage = 10;
  const totalCard = 50;
  const mockPaginate = jest.fn();

  test('updates URL query parameter when page changes', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/page/1']}>
          <Routes>
            <Route
              path="/search/page/:page"
              element={
                <Pagination
                  cardPerPage={cardPerPage}
                  totalCard={totalCard}
                  paginate={mockPaginate}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('2').getAttribute('href')).toBe('/search/page/2');
  });

  test('renders and interacts with Pagination component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/search/page/1']}>
          <Routes>
            <Route
              path="/search/page/:page"
              element={
                <Pagination
                  cardPerPage={cardPerPage}
                  totalCard={totalCard}
                  paginate={mockPaginate}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getAllByRole('link')).toHaveLength(5);

    expect(screen.getByText('1')).toHaveClass('active');

    fireEvent.click(screen.getByText('3'));

    expect(mockPaginate).toHaveBeenCalledWith(3);

    expect(screen.getByText('3')).toHaveClass('active');
  });
});
