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

    // Проверка, что компонент корректно отрисовывает количество страниц
    expect(screen.getAllByRole('link')).toHaveLength(5); // Например, 1, 2, 3, ..., 5

    // Проверка, что активная страница выделена правильным образом
    expect(screen.getByText('1')).toHaveClass('active');

    // Клик на другую страницу
    fireEvent.click(screen.getByText('3'));

    // Проверка, что обработчик paginate вызван с правильным аргументом
    expect(mockPaginate).toHaveBeenCalledWith(3);

    // Проверка, что активная страница теперь 3
    expect(screen.getByText('3')).toHaveClass('active');
  });

  // test('renders correct page numbers when totalPages > displayLimit', async () => {
  //   await act(async () => {
  //     render(
  //       <MemoryRouter initialEntries={['/search/page/1']}>
  //         <Routes>
  //           <Route
  //             path="/search/page/:page"
  //             element={
  //               <Pagination
  //                 cardPerPage={cardPerPage}
  //                 totalCard={totalCard}
  //                 paginate={mockPaginate}
  //               />
  //             }
  //           />
  //         </Routes>
  //       </MemoryRouter>
  //     );
  //   });

  //   const displayLimit = 10; // Установите значение displayLimit в соответствии с вашей реализацией
  //   const totalPages = Math.ceil(totalCard / cardPerPage);

  //   fireEvent.click(screen.getByText('1'));
  //   expect(screen.getAllByRole('link')).toHaveLength(
  //     Math.min(displayLimit, totalPages)
  //   );
  //   expect(screen.getByText('...')).toBeInTheDocument();
  //   expect(screen.getByText('5')).toBeInTheDocument();

  //   // Проверка, что компонент корректно отображает страницы, когда Number(page) > totalCard! - Math.floor(displayLimit / 2)
  //   fireEvent.click(screen.getByText('5'));
  //   expect(screen.getAllByRole('link')).toHaveLength(
  //     Math.min(displayLimit, totalPages) + 1
  //   );
  //   expect(screen.getByText('1')).toBeInTheDocument();
  //   expect(screen.getByText('...')).toBeInTheDocument();
  //   expect(screen.getByText('5')).toBeInTheDocument();

  //   // Проверка, что компонент корректно отображает страницы, в остальных случаях
  //   fireEvent.click(screen.getByText('3'));
  //   const expectedLength = Math.min(displayLimit, totalPages) + 2;
  //   expect(screen.getAllByRole('link')).toHaveLength(expectedLength);
  //   expect(screen.getByText('1')).toBeInTheDocument();
  //   expect(screen.getByText('...')).toBeInTheDocument();
  //   expect(screen.getByText('5')).toBeInTheDocument();
  // });
});
