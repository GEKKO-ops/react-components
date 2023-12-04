import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { renderWithProviders } from '../../utils/test-utils';
import { setupServer } from 'msw/node';

describe('SearchBar component', () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => server.close());

  const renderSetup = () =>
    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  test('clicking the Search button saves the entered value to the local storage', async () => {
    renderSetup();

    Storage.prototype.setItem = jest.fn();
    fireEvent.change(screen.getByPlaceholderText('Enter your search term'), {
      target: { value: 'morty' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', 'morty');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('inputValue', 'morty');

    renderWithProviders(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      {
        preloadedState: {
          searchReducer: {
            storedSearchValue: 'morty',
          },
        },
      }
    );

    const input = screen.getByPlaceholderText(
      'Enter your search term'
    ) as HTMLInputElement;
    expect(input.value).toBe('morty');
  });
});
