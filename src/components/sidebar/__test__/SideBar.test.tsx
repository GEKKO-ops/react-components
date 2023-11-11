import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as apiService from '../../../service/apiService';
import SideBar from '../SideBar';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '../../../stores/SearchContext';
import ResultCatalog from '../../result-catalog/ResultCatalog';

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

  // const apiService = jest.fn().mockResolvedValue(apiData.results[0]);

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
      await screen.findByText(/Morty Smith/);
    });

    await waitFor(() => {
      expect(fetchCharacterSpy).toHaveBeenCalledWith('1');
      expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);
      fetchCharacterSpy.mockRestore();
    });
  });
});
