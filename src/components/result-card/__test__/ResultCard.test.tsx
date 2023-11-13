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

  test('renders relevant card data', () => {
    render(<ResultCard item={apiData.results[0]} />);

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('gender: Male')).toBeInTheDocument();
    expect(screen.getByText('species: Human')).toBeInTheDocument();
    expect(screen.getByText('status: Alive')).toBeInTheDocument();
    expect(screen.getByAltText('Morty Smith-image')).toBeInTheDocument();
  });
});
