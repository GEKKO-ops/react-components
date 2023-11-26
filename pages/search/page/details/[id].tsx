import { fetchCharacter, fetchData } from '../../../../service/apiService';
import { GetServerSidePropsContext } from 'next';
import { ApiData, IApi } from '@/utils/types/types';
import { useAppDispatch, useAppSelector } from '@/stores/hooks/redux';
import { viewModeSlice } from '@/stores/reducers/viewModeSlice';
import styles from '../../../../styles/sideBar.module.css';
import { useRouter } from 'next/router';
import ErrorButton from '@/components/ErrorButton/ErrorButton';
import CustomHeader from '@/components/CustomHeader/CustomHeader';
import PaginationContainer from '@/components/PaginationContainer/PaginationContainer';
import SelectItemPerPage from '@/components/select/SelectItemPerPage';
import ResultCard from '@/components/ResultCard/ResultCard';

const SideBar = ({
  data1,
  data,
  pageSize,
  page,
}: {
  data1: ApiData;
  data: IApi;
  pageSize: string;
  page: string;
}) => {
  const { isSideBarOpen } = useAppSelector((state) => state.viewModeReducer);
  const { setIsSideBarOpen } = viewModeSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryParam = router.query['search.name'];
  const closeSideBar = () => {
    dispatch(setIsSideBarOpen(false));
    const query = queryParam ? { page, 'search.name': queryParam } : { page };
    router.push(
      {
        pathname: `/search/page/[page]`,
        query,
      },
      `/search/page/${page}`
    );
  };

  return (
    <>
      <div className="wrap">
        <ErrorButton />
        <h1 className="main-title"> Rick and Morty API</h1>
        <div className="main-wrap">
          <CustomHeader />
          <div className="section main-section">
            <h2>Serch results:</h2>
            <PaginationContainer
              cardPerPage={Number(pageSize)}
              totalCard={data1?.total}
              page={page}
            />
            <SelectItemPerPage totalCard={pageSize} />
            <ul className="result-list">
              {data1?.results.map((item) => (
                <ResultCard
                  key={item.id}
                  item={item}
                ></ResultCard>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`${styles.sidebar} ${styles.open}`}
        data-testid="sidebar"
      >
        <button
          className={styles.close_button}
          onClick={closeSideBar}
          data-testid="sidebar_close"
        >
          &#10006;
        </button>
        <div
          className={styles.sidebar_content}
          data-testid="sidebar-test-id"
        >
          <p className="item-title">{data.name}</p>
          <div className="item-description">
            <p>{`gender: ${data.gender}`}</p>
            <p>{`species: ${data.species}`}</p>
            <p>{`status: ${data.status}`}</p>
          </div>
          <img
            src={data.image}
            alt={`${data.name}-image`}
          />
        </div>
      </div>
      <div
        className={`${styles.overlay} ${isSideBarOpen ? styles.active : ''}`}
        onClick={closeSideBar}
      ></div>
    </>
  );
};

export default SideBar;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id as string;
  const pageUrl = context.query?.page as string;
  const page = pageUrl || '1';
  const pageSize: string = Array.isArray(context.query?.pageSize)
    ? context.query?.pageSize[0] || '20'
    : context.query?.pageSize || '20';
  const queryParam = context.query['search.name'] as string;
  const data1 = await fetchData(queryParam, page, pageSize);
  const data = await fetchCharacter(id);

  return {
    props: {
      data1,
      data,
      pageSize,
      page,
    },
  };
}
