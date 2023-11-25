import { screen, fireEvent } from '@testing-library/react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import PaginationContainer, { PaginationProps } from './PaginationContainer';
import { renderWithProviders } from '../../utils/test-utils';

describe('Pagination component', () => {
  const cardPerPage = 10;
  const totalCard = 50;

  const renderSetup = ({ cardPerPage, totalCard }: PaginationProps) =>
    renderWithProviders(
      <MemoryRouter initialEntries={['/search/page/1']}>
        <Routes>
          <Route
            path="/search/page/:page"
            element={
              <PaginationContainer
                cardPerPage={cardPerPage}
                totalCard={totalCard}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

  test('updates URL query parameter when page changes', async () => {
    renderSetup({ cardPerPage, totalCard });
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText('2').getAttribute('href')).toBe('/search/page/2');
  });

  test('renders and interacts with Pagination component', async () => {
    renderSetup({ cardPerPage, totalCard });

    expect(screen.getAllByRole('link')).toHaveLength(5);

    expect(screen.getByText('1')).toHaveClass('active');

    fireEvent.click(screen.getByText('3'));

    expect(screen.getByText('3')).toHaveClass('active');
  });
});
