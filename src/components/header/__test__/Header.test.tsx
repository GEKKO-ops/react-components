import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../../stores/SearchContext';
import Header from '../Header';

describe('SearchBar component', () => {
  const props = {
    handleStartSearch: () => {},
    handleStopSearch: () => {},
  };
  const apiData = {
    results: [],
    total: 0,
  };
  const context = {
    localStorageValue: 'morty',
    apiData: apiData,
    setFetchData: () => {},
    setLocalStorageValue: () => {},
  };
  test('renders the Header', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<Header {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    expect(true).toBeTruthy();
  });
  test('clicking the Search button saves the entered value to the local storage', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<Header {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });

    Storage.prototype.setItem = jest.fn();
    fireEvent.change(screen.getByPlaceholderText('Enter your search term'), {
      target: { value: 'morty' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', 'morty');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <Routes>
              <Route
                path="/*"
                element={<Header {...props} />}
              />
            </Routes>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    const input = screen.getByPlaceholderText(
      'Enter your search term'
    ) as HTMLInputElement;
    expect(input.value).toBe('morty');
  });
});
