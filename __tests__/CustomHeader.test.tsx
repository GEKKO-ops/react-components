import { fireEvent, render, screen } from '@testing-library/react';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import { act } from 'react-dom/test-utils';
import 'jest-localstorage-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('SearchBar component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderSetup = () => render(<CustomHeader />);

  test('clicking the Search button saves the entered value to the local storage', async () => {
    await act(async () => {
      renderSetup();
    });

    Storage.prototype.setItem = jest.fn();
    fireEvent.change(screen.getByPlaceholderText('Enter your search term'), {
      target: { value: 'morty' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.setItem).toHaveBeenCalledWith('inputValue', 'morty');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('inputValue', 'morty');
    await act(async () => {
      renderSetup();
    });
    const input = screen.getByPlaceholderText(
      'Enter your search term'
    ) as HTMLInputElement;
    expect(input.value).toBe('morty');
  });
});
