import { FC, useEffect, useState } from 'react';
import { fetchData } from '../../service/apiService';
import ResultCard from '../result-card/ResultCard';
import Pagination from '../pagination/Pagination';
import {
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import SideBar from '../sidebar/SideBar';
import SelectItemPerPage from '../select/SelectItemPerPage';
import { apiDataSlice } from '../../stores/reducers/ApiDataSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
import '../components.css';

interface ResultCatalogProps {
  startPage: boolean;
  handleStopSearch: () => void;
}

const ResultCatalog: FC<ResultCatalogProps> = (props) => {
  const { page } = useParams();
  const [currentPage, setcurrentPage] = useState(Number(page));
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [totalCard, setTotalCard] = useState<string>('20');
  const navigate = useNavigate();
  const { localStorageValue } = useAppSelector((state) => state.searchReducer);
  const dispatch = useAppDispatch();
  const { apiData, isLoading, error } = useAppSelector(
    (state) => state.apiReducer
  );

  useEffect(() => {
    fetchDataForAllPages(localStorageValue, props.startPage);
  }, [localStorageValue, currentPage, totalCard, page, props.startPage]);

  useEffect(() => {
    const isSideBarOpen = localStorage.getItem('isSideBarOpen');
    if (isSideBarOpen === 'true') {
      setIsSideBarOpen(true);
    }
  }, []);

  const fetchDataForAllPages = async (
    queryParam: string | null,
    startPage: boolean
  ) => {
    props.handleStopSearch();

    try {
      dispatch(apiDataSlice.actions.apiFetchingData());
      const data = await fetchData(queryParam, page!, totalCard, startPage);
      dispatch(apiDataSlice.actions.apiFetchingSuccess(data));
    } catch (error) {
      dispatch(apiDataSlice.actions.apiFetchingError('Fetch error'));
    }
  };

  const paginate = (pageNumber: number) => setcurrentPage(pageNumber);

  const closeSideBar = () => {
    setIsSideBarOpen(false);
    localStorage.setItem('isSideBarOpen', 'false');
    navigate(`/search/page/${page}`, { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalCard(e.target.value);
    navigate('/search/page/1', { replace: true });
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error ? (
        <div>Oops, nothing found!!!</div>
      ) : (
        <div className="section main-section">
          <h2>Serch results:</h2>
          <Pagination
            cardPerPage={Number(totalCard)}
            totalCard={apiData.total}
            paginate={paginate}
          />
          <SelectItemPerPage
            totalCard={totalCard.toString()}
            handleChange={handleChange}
          />
          <ul className="result-list">
            {apiData.results.map((item) => (
              <Link
                data-testid="result-card-link"
                to={`details/${item.id}`}
                key={item.id}
                onClick={() => {
                  setIsSideBarOpen(true);
                  localStorage.setItem('isSideBarOpen', 'true');
                }}
              >
                <ResultCard item={item}></ResultCard>
              </Link>
            ))}
          </ul>
          <Routes>
            <Route
              path="details/:id"
              element={
                <SideBar
                  id={''}
                  isSideBarOpen={isSideBarOpen}
                  closeSideBar={closeSideBar}
                />
              }
            />
          </Routes>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default ResultCatalog;
