import { FC, useEffect, useState } from 'react';
import { fetchData } from '../../service/apiService';
import { ApiInfo, IApi } from '../../utils/types/types';
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
  const [apiInfo, setApiInfo] = useState<ApiInfo>();
  const [hasError, setHasError] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [totalCard, setTotalCard] = useState(20);
  const { page } = useParams();
  const navigate = useNavigate();
  const defaultApiCardPerPage = 20;
  const startApiPage =
    (Number(page) - 1) * (totalCard / defaultApiCardPerPage) + 1;

  const totalPages = Math.ceil(totalCard / defaultApiCardPerPage);

  useEffect(() => {
    async function fetchDataForAllPages(
      queryParam: string | undefined,
      startPage: boolean
    ) {
      setIsLoaded(false);
      setHasError(false);
      props.handleStopSearch();

      const allResults = [];
      let pageApi = startApiPage;
      let totalApiPages = 0;

      try {
        while (true) {
          const data = await fetchData(queryParam, pageApi, startPage);
          allResults.push(...data.results);
          setApiInfo(data.info);
          totalApiPages = data.info.pages;

          if (
            pageApi < startApiPage + totalPages - 1 &&
            pageApi < totalApiPages
          ) {
          } else {
            break;
          }
          pageApi++;
        }

        setItems(allResults);
        setIsLoaded(true);
      } catch (error) {
        console.error('Fetch error:', error);
        setIsLoaded(true);
        setHasError(true);
      }
    }

    fetchDataForAllPages(props.queryParam, props.startPage);
  }, [props.queryParam, currentPage, totalCard, totalPages]);

  const paginate = (pageNumber: number) => setcurrentPage(pageNumber);

  const closeSideBar = () => {
    setIsSideBarOpen(false);
    navigate(`/search/page/${page}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalCard(Number(e.target.value));
    navigate('/search/page/1');
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (hasError) {
    return <div>Oops, nothing found!!!</div>;
  } else {
    return (
      <div className="section main-section">
        <h2>Serch results:</h2>
        <Pagination
          cardPerPage={totalCard}
          totalCard={apiInfo?.count}
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
              onClick={() => setIsSideBarOpen(true)}
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
