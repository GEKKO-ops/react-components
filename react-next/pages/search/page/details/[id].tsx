import { FC } from 'react';
import { fetchCharacter } from '../../../../service/apiService';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../stores/hooks/redux';
// import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
// import './sideBar.css';
// import { useRouter } from 'next/router';
// import { skipToken } from '@reduxjs/toolkit/query';
// import { wrapper } from '@/stores/store';
import { GetServerSidePropsContext } from 'next';
import { IApi } from '@/utils/types/types';

const SideBar: FC<IApi> = (data) => {
  // const router = useRouter();
  // const id = router.query.id;
  // const { data, isLoading } = fetchData.useGetCharacterQuery(
  //   typeof id === 'string' ? id : skipToken,
  //   {
  //     skip: router.isFallback,
  //   }
  // );
  // const { isSideBarOpen } = useAppSelector((state) => state.viewModeReducer);
  // const { setIsSideBarOpen } = viewModeSlice.actions;
  // const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const closeSideBar = () => {
  //   dispatch(setIsSideBarOpen(false));
  //   localStorage.setItem('isSideBarOpen', 'false');
  //   if (page) {
  //     navigate(`/search/page/${page}`, { replace: true });
  //   }
  // };

  return (
    <>
      <div
      // className={`sidebar${isSideBarOpen ? ' open' : ''}`}
      // data-testid="sidebar"
      >
        {/* <button
          className="close-button"
          onClick={closeSideBar}
          data-testid="sidebar-close"
        >
          &#10006;
        </button> */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data && (
            <div
              className="sidebar-content"
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
          )
        )}
      </div>
      {/* <div
        className={`overlay${isSideBarOpen ? ' active' : ''}`}
        onClick={closeSideBar}
      ></div> */}
    </>
  );
};

export default SideBar;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const id = context.query?.id;
//     if (typeof id === 'string') {
//       store.dispatch(getCharacter.initiate(id));
//     }

//     await Promise.all(store.dispatch(fetchData.util.getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query?.id as string;

  const data = await fetchCharacter(id);

  return {
    props: {
      data,
    },
  };
}
