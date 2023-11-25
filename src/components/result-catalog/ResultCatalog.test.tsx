import { screen, waitFor } from '@testing-library/react';
import ResultCatalog, { ResultCatalogProps } from './ResultCatalog';
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
  const props = {
    startPage: false,
    handleStopSearch: jest.fn(),
  };

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());
  const renderSetup = (props: ResultCatalogProps) =>
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

  test('renders specified number of cards', async () => {
    server.use(taskResponse);
    renderSetup(props);
    await waitFor(async () => {
      const cards = await screen.findAllByText('Morty Smith');
      expect(cards.length).toBe(1);
    });
  });

  test('renders "Oops, nothing is found!!!" message when no cards are present', async () => {
    server.use(emptyResponse);
    renderSetup(props);
    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(
        /Oops, nothing is found!!!/i
      );
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });
});
