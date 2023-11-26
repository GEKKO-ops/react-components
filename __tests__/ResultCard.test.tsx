import { act, fireEvent, screen } from '@testing-library/react';
import ResultCard, {
  ResultCardProps,
} from '../components/ResultCard/ResultCard';
import { renderWithProviders } from '../utils/test-utils';

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
    renderWithProviders(<ResultCard {...props} />);

  test('renders relevant card data', () => {
    renderSetup(props);

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('gender: Male')).toBeInTheDocument();
    expect(screen.getByText('species: Human')).toBeInTheDocument();
    expect(screen.getByText('status: Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith-image')).toBeInTheDocument();
  });

  test('opens a detailed card component on clicking', async () => {
    renderSetup(props);

    const card = await screen.findByTestId('card');
    await act(async () => {
      fireEvent.click(card);
    });

    expect((await screen.findByRole('link')).getAttribute('href')).toMatch(
      '/search/page/details/1'
    );
  });
});
