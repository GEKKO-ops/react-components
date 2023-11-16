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
import { useAppSelector } from '../../stores/hooks/redux';
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
  const { data, isLoading } =
    localStorageValue === null
      ? fetchData.useGetAllCharacterQuery({
          page: currentPage,
          pageSize: totalCard,
        })
      : fetchData.useSearchCharacterByNameQuery({
          queryParam: localStorageValue!,
          page: currentPage,
          pageSize: totalCard,
        });

  useEffect(() => {
    props.handleStopSearch();
  }, [props.startPage]);

  useEffect(() => {
    const isSideBarOpen = localStorage.getItem('isSideBarOpen');
    if (isSideBarOpen === 'true') {
      setIsSideBarOpen(true);
    }
  }, []);

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
      {data?.results.length === 0 ? (
        <div>Oops, nothing found!!!</div>
      ) : (
        <div className="section main-section">
          <h2>Serch results:</h2>
          <Pagination
            cardPerPage={Number(totalCard)}
            totalCard={data?.total}
            paginate={paginate}
          />
          <SelectItemPerPage
            totalCard={totalCard.toString()}
            handleChange={handleChange}
          />
          <ul className="result-list">
            {data?.results.map((item) => (
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
