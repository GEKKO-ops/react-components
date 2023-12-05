import { FC } from 'react';
import { IApi } from '../../utils/types/types';
import { setIsSideBarOpen } from '../../stores/reducers/viewModeSlice';
import { useAppDispatch } from '../../stores/hooks/redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface ResultCardProps {
  item: IApi;
}

const ResultCard: FC<ResultCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { ['search.name']: queryParam, pageSize, page } = router.query;
  const params = {
    ...(queryParam && { 'search.name': queryParam }),
    ...(pageSize && { pageSize }),
    ...(page && { page }),
  };
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return (
    <li
      className="result-item"
      data-testid="card"
      key={item.id}
      onClick={() => {
        dispatch(setIsSideBarOpen(true));
      }}
    >
      <Link href={`/search/page/details/${item.id}?${queryString}`}>
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
      </Link>
    </li>
  );
};

export default ResultCard;
