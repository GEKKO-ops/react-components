import { FC } from 'react';
import { IApi } from '../../utils/types/types';
import Link from 'next/link';
// import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
// import { useAppDispatch } from '../../stores/hooks/redux';
// import '../components.css';

interface ResultCardProps {
  item: IApi;
}

const ResultCard: FC<ResultCardProps> = ({ item }) => {
  // const { setIsSideBarOpen } = viewModeSlice.actions;
  // const dispatch = useAppDispatch();
  return (
    <li className="result-item">
      <Link
        data-testid="result-card-link"
        key={item.id}
        onClick={() => {
          // dispatch(setIsSideBarOpen(true));
          localStorage.setItem('isSideBarOpen', 'true');
        }}
        href={`details/${item.id}`}
      ></Link>

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
