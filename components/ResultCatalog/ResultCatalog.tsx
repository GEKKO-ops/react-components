import { fetchData } from '../../service/apiService';
import ResultCard from '../ResultCard/ResultCard';
import { GetServerSidePropsContext } from 'next';
import { ApiData } from '@/utils/types/types';
import PaginationContainer from '../PaginationContainer/PaginationContainer';
import SelectItemPerPage from '../select/SelectItemPerPage';

const ResultCatalog = ({
  data,
  pageLimit,
  page,
}: {
  data: ApiData;
  pageLimit: string;
  page: string;
}) => {
  return (
    <>
      {data?.results.length === 0 ? (
        <div>Oops, nothing is found!!!</div>
      ) : (
        <div className="section main-section">
          <h2>Serch results:</h2>
          <PaginationContainer
            cardPerPage={Number(pageLimit)}
            totalCard={data?.total}
            page={page}
          />
          <SelectItemPerPage totalCard={pageLimit} />
          <ul className="result-list">
            {data?.results.map((item) => (
              <ResultCard
                key={item.id}
                item={item}
              ></ResultCard>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ResultCatalog;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageUrl = context.params?.page as string;
  const page = pageUrl;
  const pageLimit: string = Array.isArray(context.query.pageLimit)
    ? context.query.pageLimit[0] || '20'
    : context.query.pageLimit || '20';
  const queryParam = context.query['search.name'] as string;

  const data = await fetchData(queryParam, page, pageLimit);

  return {
    props: {
      data,
      pageLimit,
      page: pageUrl,
    },
  };
}
