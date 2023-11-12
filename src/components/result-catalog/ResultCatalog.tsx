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
import { useAppContext } from '../../stores/SearchContext';
import '../components.css';

interface ResultCatalogProps {
  startPage: boolean;
  handleStopSearch: () => void;
}

const ResultCatalog: FC<ResultCatalogProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { page } = useParams();
  const [currentPage, setcurrentPage] = useState(Number(page));
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [totalCard, setTotalCard] = useState<string>('20');
  const navigate = useNavigate();
  const { localStorageValue } = useAppContext();
  const { apiData, setFetchData } = useAppContext();

  useEffect(() => {
    let isMounted = true;

    async function fetchDataForAllPages(
      queryParam: string | undefined,
      startPage: boolean
    ) {
      setIsLoaded(false);
      props.handleStopSearch();

      try {
        const data = await fetchData(queryParam, page!, totalCard, startPage);

        if (isMounted) {
          setFetchData(data);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setIsLoaded(true);
      }
    }

    fetchDataForAllPages(localStorageValue, props.startPage);

    return () => {
      isMounted = false;
    };
  }, [localStorageValue, currentPage, totalCard, page, props.startPage]);

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
    console.log('not open');
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalCard(e.target.value);
    navigate('/search/page/1', { replace: true });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (apiData.results.length === 0) {
    return <div>Oops, nothing found!!!</div>;
  } else {
    return (
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
    );
  }
};

export default ResultCatalog;
