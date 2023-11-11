import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCatalog from '../ResultCatalog';
import { BrowserRouter, LinkProps, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../../stores/SearchContext';
import userEvent from '@testing-library/user-event';

jest.mock('../../../service/apiService');

describe('ResultCatalog', () => {
  const props = {
    startPage: false,
    handleStopSearch: () => {},
  };
  const apiData = {
    results: [
      {
        id: 1,
        name: 'Morty Smith',
        gender: 'Male',
        species: 'Human',
        status: 'Alive',
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      },
    ],
    total: 1,
  };
  jest.fn().mockResolvedValue(apiData);
  const context = {
    localStorageValue: '',
    apiData: apiData,
    setFetchData: () => {},
    setLocalStorageValue: () => {},
  };

  test('renders the list', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<ResultCatalog {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    expect(true).toBeTruthy();
  });

  test('renders specified number of cards', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<ResultCatalog {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });

    const cards = await screen.findAllByTestId('result-card-link');
    expect(cards.length).toBe(1);
  });

  test('renders "Oops, nothing found!!!" message when no cards are present', async () => {
    const props = {
      startPage: true,
      handleStopSearch: () => {},
    };
    await act(async () => {
      render(
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={<ResultCatalog {...props} />}
            />
          </Routes>
        </BrowserRouter>
      );
    });

    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(/Oops, nothing found!!!/i);
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });

  test('opens a detailed card component on clicking', async () => {
    jest.mock('react-router-dom', () => {
      const originalModule = jest.requireActual('react-router-dom');

      return {
        ...originalModule,
        Link: (props: LinkProps) => <a {...props} />,
      };
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<ResultCatalog {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });

    userEvent.click(screen.getByTestId('result-card-link'));
    expect(screen.getByTestId('result-card-link').getAttribute('href')).toBe(
      '/details/1'
    );
  });
});
