import { FC, useEffect } from 'react';
import { fetchData } from '../../service/apiService';
import ResultCard from '../result-card/ResultCard';
import Pagination from '../pagination/Pagination';
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import SelectItemPerPage from '../select/SelectItemPerPage';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import { itemsPerPageSlice } from '../../stores/reducers/ItemsPerPageSlice';
import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
import '../components.css';

interface ResultCatalogProps {
  startPage: boolean;
  handleStopSearch: () => void;
}

const ResultCatalog: FC<ResultCatalogProps> = ({
  startPage,
  handleStopSearch,
}) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const { itemsNumber } = useAppSelector((state) => state.itemsPerPageReducer);
  const { setItemsPerPage } = itemsPerPageSlice.actions;
  const dispatch = useAppDispatch();
  const { storedSearchValue } = useAppSelector((state) => state.searchReducer);
  const { setIsSideBarOpen } = viewModeSlice.actions;
  const { data, isLoading } =
    storedSearchValue === null
      ? fetchData.useGetAllCharacterQuery({
          page: page!,
          pageSize: itemsNumber,
        })
      : fetchData.useSearchCharacterByNameQuery({
          queryParam: storedSearchValue!,
          page: page!,
          pageSize: itemsNumber,
        });

  useEffect(() => {
    handleStopSearch();
  }, [startPage]);

  useEffect(() => {
    if (localStorage.getItem('isSideBarOpen')) {
      dispatch(setIsSideBarOpen(true));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemsPerPage(event.target.value));
    navigate('/search/page/1', { replace: true });
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data?.results.length === 0 ? (
        <div>Oops, nothing is found!!!</div>
      ) : (
        <div className="section main-section">
          <h2>Serch results:</h2>
          <Pagination
            cardPerPage={Number(itemsNumber)}
            totalCard={data?.total}
          />
          <SelectItemPerPage
            totalCard={itemsNumber}
            handleChange={handleChange}
          />
          <ul className="result-list">
            {data?.results.map((item) => (
              <ResultCard
                key={item.id}
                item={item}
              ></ResultCard>
            ))}
          </ul>
          <Routes>
            <Route
              path="details/:id"
              element={<SideBar />}
            />
          </Routes>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default ResultCatalog;
