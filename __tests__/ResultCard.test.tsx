import {
  act,
  fireEvent,
  screen,
  waitFor,
  render,
} from '@testing-library/react';
import ResultCard, {
  ResultCardProps,
} from '../components/ResultCard/ResultCard';
import { setupStore } from '../stores/store';
import { Provider } from 'react-redux';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('ResaltCard', () => {
  const props = {
    item: {
      id: 1,
      name: 'Morty Smith',
      gender: 'Male',
      species: 'Human',
      status: 'Alive',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSetup = (props: ResultCardProps) =>
    render(
      <Provider store={setupStore()}>
        <ResultCard {...props} />
      </Provider>
    );

  test('renders relevant card data', () => {
    renderSetup(props);

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('gender: Male')).toBeInTheDocument();
    expect(screen.getByText('species: Human')).toBeInTheDocument();
    expect(screen.getByText('status: Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith-image')).toBeInTheDocument();
  });

  test('opens a detailed card component on clicking', async () => {
    jest.mock('next/link', () => {
      return ({ children }: { children: React.ReactNode }) => {
        return children;
      };
    });
    renderSetup(props);

    const card = await screen.findByRole('link');
    await act(async () => {
      fireEvent.click(card);
    });
    await waitFor(() => {
      expect(card.getAttribute('href')).toMatch('/search/page/details/1');
    });
  });
});
