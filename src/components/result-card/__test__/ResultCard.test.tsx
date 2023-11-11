import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultCard from '../ResultCard';

describe('ResaltCard', () => {
  const mockItem = {
    id: 1,
    name: 'Morty Smith',
    gender: 'Male',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  };
  const apiData = {
    results: [mockItem],
    total: 1,
  };
  // const mockHandler = jest.fn();

  test('renders relevant card data', () => {
    render(<ResultCard item={apiData.results[0]} />);

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('gender: Male')).toBeInTheDocument();
    expect(screen.getByText('species: Human')).toBeInTheDocument();
    expect(screen.getByText('status: Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith-image')).toBeInTheDocument();
  });

  // test('clicking on a card opens a detailed card component', async () => {
  //   const { getByText } = render(
  //     <ResultCard
  //       item={apiData.results[0]}
  //       onClick={mockHandler}
  //     />
  //   );
  //   fireEvent.click(getByText('Morty Smith'));
  // });

  // test('clicking triggers an additional API call to fetch detailed information', async () => {
  //   const { getByText } = render(<ResultCard item={mockItem} />);
  //   fireEvent.click(getByText('Morty Smith'));

  //   // Use waitFor to ensure the async API call is completed
  //   await waitFor(() => {
  //     // Add assertions for the detailed information fetched from API
  //   });
  // });
});
