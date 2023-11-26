import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SideBar, { SideBarProps } from '../pages/search/page/details/[id]';
import { setupStore } from '../stores/store';
import { Provider } from 'react-redux';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('SideBar', () => {
  const props = {
    dataAll: {
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
    dataCharacter: {
      id: 1,
      name: 'Morty Smith',
      gender: 'Male',
      species: 'Human',
      status: 'Alive',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    pageSize: '20',
    page: '1',
  };

  const renderSetup = (props: SideBarProps) =>
    render(
      <Provider store={setupStore()}>
        <SideBar {...props} />
      </Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays detailed card data', async () => {
    renderSetup(props);
    await waitFor(() => {
      expect(screen.getAllByText('Morty Smith')[1]).toBeInTheDocument();
      expect(screen.getAllByText('gender: Male')[1]).toBeInTheDocument();
      expect(screen.getAllByText('species: Human')[1]).toBeInTheDocument();
      expect(screen.getAllByText('status: Alive')[1]).toBeInTheDocument();
      const imageElement = screen.getAllByAltText(
        'Morty Smith-image'
      ) as HTMLImageElement[];
      const firstElementImage = imageElement[1];
      expect(firstElementImage.src).toBe(
        'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
      );
    });
  });
  test('clicking the close button hides the component', async () => {
    const store = setupStore();
    renderSetup(props);

    await waitFor(() => {
      const closeButton = screen.getByTestId('sidebar_close');
      fireEvent.click(closeButton);
    });

    expect(store.getState().viewModeReducer.isSideBarOpen).toBe(false);
  });
});
