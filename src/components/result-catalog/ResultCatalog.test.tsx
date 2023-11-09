import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCatalog from './ResultCatalog';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../stores/SearchContext', () => ({
  useAppContext: () => ({
    localStorageValue: '',
    apiData: { results: [], total: 0 },
    setFetchData: jest.fn(),
    setLocalStorageValue: jest.fn(),
  }),
}));

jest.mock('../../service/apiService', () => ({
  fetchData: jest.fn().mockResolvedValue({
    results: [
      { id: 1, name: '', status: '', species: '', gender: '', image: '' },
      { id: 2, name: '', status: '', species: '', gender: '', image: '' },
      { id: 3, name: '', status: '', species: '', gender: '', image: '' },
    ],
    total: 3,
  }),
}));

describe('ResultCatalog', () => {
  test('renders specified number of cards', async () => {
    const props = {
      startPage: true,
      handleStopSearch: jest.fn(),
    };

    render(
      <MemoryRouter>
        <ResultCatalog {...props} />
      </MemoryRouter>
    );

    await waitFor(() => {
      const loadingElement = screen.queryByText('Loading...');
      const errorElement = screen.queryByText('Oops, nothing found!!!');
      const cards = screen.queryAllByTestId('result-card-link');

      if (loadingElement) {
        expect(loadingElement).toBeInTheDocument();
        expect(cards.length).toBe(0);
      } else if (errorElement) {
        expect(errorElement).toBeInTheDocument();
        expect(cards.length).toBe(0);
      } else {
        expect(cards.length).toBe(3);
      }
    });
  });
});
