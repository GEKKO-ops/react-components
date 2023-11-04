import { FC, useEffect, useState } from 'react';
import { fetchData } from '../../service/apiService';
import { ApiInfo, IApi } from '../../utils/types/types';
import ResultCard from '../result-card/ResultCard';
import Pagination from '../pagination/Pagination';
import '../components.css';
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
  const [totalCard] = useState(60);
  const cardPerPage = 20;
  const startApiPage = (currentPage - 1) * (totalCard / cardPerPage) + 1;

  const totalPages = Math.ceil(totalCard / cardPerPage);

  useEffect(() => {
    async function fetchDataForAllPages(
      queryParam: string | undefined,
      startPage: boolean
    ) {
      setIsLoaded(false);
      setHasError(false);
      props.handleStopSearch();

      const allResults = [];
      let page = startApiPage;
      let totalApiPages = 0;

      try {
        while (true) {
          const data = await fetchData(queryParam, page, startPage);
          allResults.push(...data.results);
          setApiInfo(data.info);
          totalApiPages = data.info.pages;

          if (page < startApiPage + totalPages - 1 && page < totalApiPages) {
          } else {
            break;
          }
          page++;
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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (hasError) {
    return <div>Oops, nothing found!!!</div>;
  } else {
    return (
      <div className="section main-section">
        <h2>Serch results:</h2>
        <ul className="result-list">
          {items.map((item) => (
            <ResultCard
              key={item.id}
              item={item}
            ></ResultCard>
          ))}
        </ul>
        <Pagination
          cardPerPage={totalCard}
          totalCard={apiInfo?.count}
          paginate={paginate}
        />
      </div>
    );
  }
};

export default ResultCatalog;
