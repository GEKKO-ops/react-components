import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCatalog from '../ResultCatalog';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../../stores/SearchContext';
import * as apiService from '../../../service/apiService';

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
  afterEach(jest.clearAllMocks);
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
    const mockClick = jest.fn();
    const fetchCharacterSpy = jest
      .spyOn(apiService, 'fetchCharacter')
      .mockResolvedValue(apiData.results[0]);
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={
                  <ResultCatalog {...props}>
                    <Link
                      onClick={mockClick}
                      to={''}
                    />
                  </ResultCatalog>
                }
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('result-card-link'));
    });
    expect(fetchCharacterSpy).toHaveBeenCalled();
  });
});
