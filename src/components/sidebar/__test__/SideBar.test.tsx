import {
  act,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideBar from '../SideBar';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../../stores/SearchContext';
import ResultCatalog from '../../result-catalog/ResultCatalog';
import '@testing-library/jest-dom';
import * as apiService from '../../../service/apiService';

jest.mock('../../../service/apiService');
describe('SideBar', () => {
  const props = {
    startPage: false,
    handleStopSearch: () => {},
  };
  const apiData = {
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
  };
  const context = {
    localStorageValue: '',
    apiData: apiData,
    setFetchData: () => {},
    setLocalStorageValue: () => {},
  };
  afterEach(jest.clearAllMocks);

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchCharacterSpy = jest
      .spyOn(apiService, 'fetchCharacter')
      .mockResolvedValue(apiData.results[0]);

    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <ResultCatalog {...props}>
              <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                  <Route
                    path="details/:id"
                    element={
                      <SideBar
                        id=""
                        isSideBarOpen={true}
                        closeSideBar={() => {}}
                      />
                    }
                  />
                </Routes>
              </MemoryRouter>
            </ResultCatalog>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });

    await act(async () => {
      userEvent.click(screen.getByTestId('result-card-link'));
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await screen.findByText(/Morty Smith/);

    expect(fetchCharacterSpy).toHaveBeenCalledWith('1');
    expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);
    fetchCharacterSpy.mockRestore();
  });

  test('displays a loading indicator while fetching data', async () => {
    jest.spyOn(apiService, 'fetchCharacter').mockImplementation(() => {
      return new Promise((resolve) =>
        setTimeout(() => resolve(apiData.results[0]), 1000)
      );
    });
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <ResultCatalog {...props}>
              <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                  <Route
                    path="details/:id"
                    element={
                      <SideBar
                        id=""
                        isSideBarOpen={true}
                        closeSideBar={() => {}}
                      />
                    }
                  />
                </Routes>
              </MemoryRouter>
            </ResultCatalog>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
    });
  });

  test('displays detailed card data', async () => {
    jest
      .spyOn(apiService, 'fetchCharacter')
      .mockResolvedValue(apiData.results[0]);
    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <ResultCatalog {...props}>
              <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                  <Route
                    path="details/:id"
                    element={
                      <SideBar
                        id=""
                        isSideBarOpen={true}
                        closeSideBar={() => {}}
                      />
                    }
                  />
                </Routes>
              </MemoryRouter>
            </ResultCatalog>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });
    const character = apiData.results[0];
    const sideBarContent = screen.getByTestId('sidebar-test-id');

    const elementName = getByText(sideBarContent, character.name);
    const elementGender = getByText(
      sideBarContent,
      `gender: ${character.gender}`
    );
    const elementSpecies = getByText(
      sideBarContent,
      `species: ${character.species}`
    );
    const elementStatus = getByText(
      sideBarContent,
      `status: ${character.status}`
    );
    expect(elementName).toBeInTheDocument();
    expect(elementGender).toBeInTheDocument();
    expect(elementSpecies).toBeInTheDocument();
    expect(elementStatus).toBeInTheDocument();

    const imageElement = screen.getAllByAltText(
      `${character.name}-image`
    ) as HTMLImageElement[];
    const firstElementImage = imageElement[1];
    expect(firstElementImage.src).toBe(character.image);
  });

  test('clicking the close button hides the component', async () => {
    jest
      .spyOn(apiService, 'fetchCharacter')
      .mockResolvedValue(apiData.results[0]);

    await act(async () => {
      render(
        <BrowserRouter>
          <AppContext.Provider value={context}>
            <ResultCatalog {...props}>
              <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                  <Route
                    path="details/:id"
                    element={
                      <SideBar
                        id=""
                        isSideBarOpen={true}
                        closeSideBar={() => {}}
                      />
                    }
                  />
                </Routes>
              </MemoryRouter>
            </ResultCatalog>
          </AppContext.Provider>
        </BrowserRouter>
      );
    });

    await act(async () => {
      const sideBar = await screen.findByTestId('sidebar');
      expect(sideBar).toHaveClass('open');
    });
    const closeButton = screen.getByTestId('sidebar-close');
    await act(async () => {
      await waitFor(() => {
        userEvent.click(closeButton);
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });
});
