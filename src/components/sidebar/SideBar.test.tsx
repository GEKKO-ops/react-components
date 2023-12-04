import { fireEvent, screen, waitFor } from '@testing-library/react';
import SideBar from './SideBar';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { setupServer } from 'msw/node';
import { HttpResponse, delay, http } from 'msw';
import { store } from '../../stores/store';

const handlers = [
  http.get('https://belka.romakhin.ru/api/v1/rimorti/1', async () => {
    await delay(30);
    return HttpResponse.json({
      id: 1,
      name: 'Morty Smith',
      gender: 'Male',
      species: 'Human',
      status: 'Alive',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    });
  }),
];
describe('SideBar', () => {
  const server = setupServer(...handlers);
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  const renderSetup = () =>
    renderWithProviders(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route
            path="details/:id"
            element={<SideBar />}
          />
        </Routes>
      </MemoryRouter>
    );

  test('displays a loading indicator while fetching data', async () => {
    renderSetup();

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
  test('displays detailed card data', async () => {
    renderSetup();
    await waitFor(() => {
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
      expect(screen.getByText('gender: Male')).toBeInTheDocument();
      expect(screen.getByText('species: Human')).toBeInTheDocument();
      expect(screen.getByText('status: Alive')).toBeInTheDocument();
      const imageElement = screen.getAllByAltText(
        'Morty Smith-image'
      ) as HTMLImageElement[];
      const firstElementImage = imageElement[0];
      expect(firstElementImage.src).toBe(
        'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
      );
    });
  });
  test('clicking the close button hides the component', async () => {
    renderSetup();

    await waitFor(() => {
      const closeButton = screen.getByTestId('sidebar-close');
      fireEvent.click(closeButton);
    });

    expect(store.getState().viewModeReducer.isSideBarOpen).toBe(false);
  });
});
