import { screen, waitFor } from '@testing-library/react';
import ResultCatalog from './ResultCatalog';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '../../utils/test-utils';

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

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  const renderSetup = () =>
    renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<ResultCatalog />}
          />
        </Routes>
      </BrowserRouter>
    );

  test('renders specified number of cards', async () => {
    server.use(taskResponse);
    renderSetup();
    await waitFor(async () => {
      const cards = await screen.findAllByText('Morty Smith');
      expect(cards.length).toBe(1);
    });
  });

  test('renders "Oops, nothing is found!!!" message when no cards are present', async () => {
    server.use(emptyResponse);
    renderSetup();
    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(
        /Oops, nothing is found!!!/i
      );
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });
});
