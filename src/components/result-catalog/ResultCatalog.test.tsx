import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCatalog from './ResultCatalog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext, AppProvider } from '../../stores/SearchContext';

describe('ResultCatalog', () => {
  const apiData = {
    results: [
      { id: 1, name: '', status: '', species: '', gender: '', image: '' },
      { id: 2, name: '', status: '', species: '', gender: '', image: '' },
      { id: 3, name: '', status: '', species: '', gender: '', image: '' },
    ],
    total: 3,
  };

  const context = {
    localStorageValue: '',
    apiData: apiData,
    setFetchData: jest.fn(),
    setLocalStorageValue: jest.fn(),
  };
  const props = {
    startPage: true,
    handleStopSearch: jest.fn(),
  };

  test('Renders the list', () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route
              path="/*"
              element={<ResultCatalog {...props} />}
            />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    );
    expect(true).toBeTruthy();
  });

  test('renders specified number of cards', async () => {
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

    const cards = await screen.findAllByTestId('result-card-link');
    expect(cards.length).toBe(3);
  });

  test('renders "Oops, nothing found!!!" message when no cards are present', async () => {
    const props = {
      startPage: true,
      handleStopSearch: jest.fn(),
    };

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

    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(/Oops, nothing found!!!/i);
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });
});
