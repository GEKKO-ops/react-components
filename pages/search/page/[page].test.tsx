import { render, screen, waitFor } from '@testing-library/react';
import ResultCatalog, { ResultCatalogProps } from './[page]';
import { Provider } from 'react-redux';
import { setupStore } from '../../../stores/store';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('ResultCatalog', () => {
  const props = {
    data: {
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
    },
    pageSize: '20',
    page: '1',
  };

  const propsEmpty = {
    data: {
      results: [],
      total: 0,
    },
    pageSize: '20',
    page: '1',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSetup = (props: ResultCatalogProps) =>
    render(
      <Provider store={setupStore()}>
        <ResultCatalog {...props} />
      </Provider>
    );

  test('renders specified number of cards', async () => {
    renderSetup(props);
    await waitFor(async () => {
      const cards = await screen.findAllByText('Morty Smith');
      expect(cards.length).toBe(1);
    });
  });

  test('renders "Oops, nothing is found!!!" message when no cards are present', async () => {
    render(
      <Provider store={setupStore()}>
        <ResultCatalog {...propsEmpty} />
      </Provider>
    );
    await waitFor(() => {
      const nothingFoundMessage = screen.getByText(
        /Oops, nothing is found!!!/i
      );
      expect(nothingFoundMessage).toBeInTheDocument();
    });
  });
});
