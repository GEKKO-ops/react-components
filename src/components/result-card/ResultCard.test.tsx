import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import ResultCard, { ResultCardProps } from './ResultCard';
import { renderWithProviders } from '../../utils/test-utils';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SideBar from '../sidebar/SideBar';
import { setupServer } from 'msw/node';
import { http } from 'msw';
import { store } from '../../stores/store';
import { fetchData } from '../../service/apiService';
import { IApi } from '../../utils/types/types';

describe('ResaltCard', () => {
  const item: IApi = {
    id: 1,
    name: 'Morty Smith',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  };
  const resolver = jest.fn();
  const handler = http.get(
    'https://belka.romakhin.ru/api/v1/rimorti/1',
    resolver
  );
  const server = setupServer();
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
    store.dispatch(fetchData.util.resetApiState());
  });

  const renderSetup = (props: ResultCardProps) =>
    renderWithProviders(
      <MemoryRouter initialEntries={['/*']}>
        <Routes>
          <Route
            path="*"
            element={<ResultCard {...props} />}
          />
        </Routes>
      </MemoryRouter>
    );

  afterAll(() => server.close());
  test('renders relevant card data', () => {
    renderSetup({ item });

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('gender: Male')).toBeInTheDocument();
    expect(screen.getByText('species: Human')).toBeInTheDocument();
    expect(screen.getByText('status: Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith-image')).toBeInTheDocument();
  });
  test('opens a detailed card component on clicking', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={<ResultCard item={item} />}
          />
        </Routes>
      </BrowserRouter>
    );

    const card = await screen.findByTestId('result-card-link');

    await act(async () => {
      userEvent.click(card);
    });
    await waitFor(() => {
      expect(window.location.pathname).toBe('/details/1');
    });
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    server.use(handler);
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <ResultCard item={item} />
                <Routes>
                  <Route
                    path="details/:id"
                    element={<SideBar />}
                  />
                </Routes>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.click(screen.getByTestId('result-card-link'));
    });
    await screen.findByText(/Morty Smith/);
    expect(resolver).toHaveBeenCalled();
  });
});
