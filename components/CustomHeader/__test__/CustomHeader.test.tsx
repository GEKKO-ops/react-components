import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CustomHeader from '../CustomHeader';
import { renderWithProviders } from '../../../utils/test-utils';
import { setupServer } from 'msw/node';

describe('SearchBar component', () => {
  const props = {
    handleStartSearch: () => {},
    handleStopSearch: () => {},
  };
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  afterAll(() => server.close());
  test('clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CustomHeader {...props} />
      </BrowserRouter>
    );

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
        <CustomHeader {...props} />
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
