import { FC } from 'react';
import { IApi } from '../../utils/types/types';
import { viewModeSlice } from '@/stores/reducers/viewModeSlice';
import { useAppDispatch } from '@/stores/hooks/redux';
import { useRouter } from 'next/router';
// import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
// import { useAppDispatch } from '../../stores/hooks/redux';
// import '../components.css';

interface ResultCardProps {
  item: IApi;
}

const ResultCard: FC<ResultCardProps> = ({ item }) => {
  const { setIsSideBarOpen } = viewModeSlice.actions;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const page = router.query.page as string;
  const queryParam = localStorage.getItem('inputValue') || '';
  const handleCard = (id: string) => {
    router.push(
      {
        pathname: `/search/page/details/[id]`,
        query: { page, id, 'search.name': queryParam },
      },
      `/search/page/details/${id}`
    );
  };
  console.log(router);
  return (
    <li
      className="result-item"
      key={item.id}
      onClick={() => {
        dispatch(setIsSideBarOpen(true));
        // localStorage.setItem('isSideBarOpen', 'true');
        handleCard(item.id.toString());
      }}
    >
      <p className="item-title">{item.name}</p>
      <div className="item-description">
        <p>{`gender: ${item.gender}`}</p>
        <p>{`species: ${item.species}`}</p>
        <p>{`status: ${item.status}`}</p>
      </div>
      <img
        src={item.image}
        alt={`${item.name}-image`}
      />
    </li>
  );
};

export default ResultCard;
