import { FC, useEffect, useState } from 'react';
import { fetchData } from '../../service/apiService';
import { IApi } from '../../utils/types/types';
import ResultCard from '../result-card/ResultCard';
import '../components.css';

interface ResultCatalogProps {
  queryParam: string;
}

const ResultCatalog: FC<ResultCatalogProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<IApi[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(props.queryParam);
  }, [props.queryParam]);

  const fetch = (queryParam: string | undefined) => {
    setIsLoaded(false);
    setHasError(false);

    fetchData(queryParam)
      .then((data) => {
        setIsLoaded(true);
        setItems(data.results);
        setHasError(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setHasError(true);
      });
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
        <ul className="result-list">
          {items.map((item) => (
            <ResultCard
              key={item.id}
              item={item}
            ></ResultCard>
          ))}
        </ul>
      </div>
    );
  }
};

export default ResultCatalog;
