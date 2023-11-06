import { FC, useEffect, useState } from 'react';
import { fetchData } from '../../service/apiService';
import { IApi } from '../../utils/types/types';
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
import '../components.css';
import SideBar from '../sidebar/SideBar';
import SelectItemPerPage from '../select/SelectItemPerPage';
interface ResultCatalogProps {
  queryParam: string;
  startPage: boolean;
  handleStopSearch: () => void;
}

const ResultCatalog: FC<ResultCatalogProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IApi[]>([]);
  const [apiInfo, setApiInfo] = useState<number>();
  const { page } = useParams();
  const [currentPage, setcurrentPage] = useState(Number(page));
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [totalCard, setTotalCard] = useState<string>('20');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDataForAllPages(
      queryParam: string | undefined,
      startPage: boolean
    ) {
      setIsLoaded(false);
      props.handleStopSearch();

      try {
        const data = await fetchData(queryParam, page!, totalCard, startPage);
        setApiInfo(data.total);
        setItems(data.results);
        setIsLoaded(true);
      } catch (error) {
        console.error('Fetch error:', error);
        setIsLoaded(true);
      }
    }

    fetchDataForAllPages(props.queryParam, props.startPage);
  }, [props.queryParam, currentPage, totalCard, page, props.startPage]);

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (items.length === 0) {
    return <div>Oops, nothing found!!!</div>;
  } else {
    return (
      <div className="section main-section">
        <h2>Serch results:</h2>
        <Pagination
          cardPerPage={Number(totalCard)}
          totalCard={apiInfo!}
          paginate={paginate}
        />
        <SelectItemPerPage
          totalCard={totalCard.toString()}
          handleChange={handleChange}
        />
        <ul className="result-list">
          {items.map((item) => (
            <Link
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
