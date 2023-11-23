import { fetchData } from '../../service/apiService';
// import { useRouter } from 'next/router';
import ResultCard from '../ResultCard/ResultCard';
import { GetServerSidePropsContext } from 'next';
import { ApiData } from '@/utils/types/types';
import PaginationContainer from '../PaginationContainer/PaginationContainer';
import SelectItemPerPage from '../select/SelectItemPerPage';
// import ResultCard from '../result-card/ResultCard';
// import PaginationContainer from '../PaginationContainer/PaginationContainer';
// import {
//   Outlet,
//   Route,
//   Routes,
//   useNavigate,
//   useParams,
// } from 'react-router-dom';
// import SideBar from '../sidebar/SideBar';
// import SelectItemPerPage from '../select/SelectItemPerPage';
// import { useAppDispatch, useAppSelector } from '../../stores/hooks/redux';
// import { itemsPerPageSlice } from '../../stores/reducers/ItemsPerPageSlice';
// import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
// import '../components.css';

// interface ResultCatalogProps {
//   startPage: boolean;
//   handleStopSearch: () => void;
// }

const ResultCatalog = ({
  data,
  pageLimit,
  page,
}: {
  data: ApiData;
  pageLimit: string;
  page: string;
}) => {
  // const { page } = useParams();
  // const navigate = useNavigate();
  // const { itemsNumber } = useAppSelector((state) => state.itemsPerPageReducer);
  // const { setItemsPerPage } = itemsPerPageSlice.actions;
  // const dispatch = useAppDispatch();
  // const { storedSearchValue } = useAppSelector((state) => state.searchReducer);
  // const { setIsSideBarOpen } = viewModeSlice.actions;
  // const router = useRouter();
  // console.log(router);
  // const queryParam = router.query.queryParam;
  // const page = router.query.page;
  // const pageSize = router.query.pageSize;
  // const { data, isLoading } =
  //   queryParam === null && page === 'string' && pageSize === 'string'
  //     ? fetchData.useGetAllCharacterQuery({
  //         page,
  //         pageSize,
  //       })
  //     : typeof queryParam === 'string' &&
  //       page === 'string' &&
  //       pageSize === 'string'
  //     ? fetchData.useSearchCharacterByNameQuery({
  //         queryParam: queryParam!,
  //         page: page!,
  //         pageSize: pageSize,
  //       })
  //     : { data: undefined, isLoading: false };

  // useEffect(() => {
  //   handleStopSearch();
  // }, [startPage]);

  // useEffect(() => {
  //   if (localStorage.getItem('isSideBarOpen')) {
  //     dispatch(setIsSideBarOpen(true));
  //   }
  // }, []);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(setItemsPerPage(event.target.value));
  //   navigate('/search/page/1', { replace: true });
  // };

  return (
    <>
      {/* {isLoading && <div>Loading...</div>} */}
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
          <SelectItemPerPage
            totalCard={pageLimit}
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
          {/* <Routes>
            <Route
              path="details/:id"
              element={<SideBar />}
            />
          </Routes>
          <Outlet /> */}
        </div>
      )}
    </>
  );
};

export default ResultCatalog;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const queryParam = context.query.queryParam;
//     const page = context.query.page;
//     const pageSize = context.query.pageSize;
//     if (
//       typeof page === 'string' &&
//       typeof pageSize === 'string' &&
//       queryParam === null
//     ) {
//       store.dispatch(getAllCharacter.initiate({ page, pageSize }));
//     } else if (
//       typeof page === 'string' &&
//       typeof pageSize === 'string' &&
//       typeof queryParam === 'string'
//     ) {
//       store.dispatch(
//         searchCharacterByName.initiate({ queryParam, page, pageSize })
//       );
//     }
//     await Promise.all(store.dispatch(fetchData.util.getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
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
