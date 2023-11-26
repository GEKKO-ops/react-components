import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCatalog from '../ResultCatalog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../../utils/test-utils';

const emptyResponse = http.get(
  'https://belka.romakhin.ru/api/v1/rimorti',
  async () => {
    await delay(30);
    return HttpResponse.json({
      results: [],
      total: 0,
    });
  }
);

const taskResponse = http.get(
  'https://belka.romakhin.ru/api/v1/rimorti',
  async () => {
    await delay(30);
    return HttpResponse.json({
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
    });
  }
);

describe('ResultCatalog', () => {
  const server = setupServer(emptyResponse, taskResponse);
  const props = {
    startPage: false,
    handleStopSearch: () => {},
  };

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  test('renders specified number of cards', async () => {
    server.use(taskResponse);
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<ResultCatalog {...props} />}
          />
        </Routes>
      </BrowserRouter>
    );
    await waitFor(async () => {
      const cards = await screen.findAllByText('Morty Smith');
      expect(cards.length).toBe(1);
    });
  });

  test('renders "Oops, nothing is found!!!" message when no cards are present', async () => {
    server.use(emptyResponse);
    renderWithProviders(
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
      const nothingFoundMessage = screen.getByText(
        /Oops, nothing is found!!!/i
      );
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });
});
