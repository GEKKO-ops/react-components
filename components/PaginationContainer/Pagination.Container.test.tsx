import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import PaginationContainer, { PaginationProps } from './PaginationContainer';
import 'jest-localstorage-mock';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Pagination component', () => {
  const props = {
    cardPerPage: 10,
    totalCard: 50,
    page: '1',
  };

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderSetup = (props: PaginationProps) =>
    render(<PaginationContainer {...props} />);

  test('updates URL query parameter when page changes', async () => {
    mockRouter.push('/search/page/2');
    renderSetup(props);
    fireEvent.click(screen.getByText('2'));
    expect(mockRouter).toMatchObject({
      pathname: '/search/page/2',
      query: { page: '2' },
    });
  });

  test('renders and interacts with Pagination component', async () => {
    renderSetup(props);

    await waitFor(() => {
      expect(screen.getAllByTestId('link')).toHaveLength(5);
    });

    expect(screen.getByText('1')).toHaveClass('custom_link active');

    fireEvent.click(screen.getByText('3'));

    renderSetup({ ...props, page: '3' });

    expect(screen.getAllByText('3')[1]).toHaveClass('custom_link active');
  });
});
