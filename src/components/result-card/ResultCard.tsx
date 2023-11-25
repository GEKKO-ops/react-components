import { FC } from 'react';
import { IApi } from '../../utils/types/types';
import { viewModeSlice } from '../../stores/reducers/viewModeSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../stores/hooks/redux';
import '../components.css';

export interface ResultCardProps {
  item: IApi;
}

const ResultCard: FC<ResultCardProps> = ({ item }) => {
  const { setIsSideBarOpen } = viewModeSlice.actions;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <li
      data-testid="result-card-link"
      className="result-item"
      key={item.id}
      onClick={() => {
        dispatch(setIsSideBarOpen(true));
        localStorage.setItem('isSideBarOpen', 'true');
        navigate(`details/${item.id}`, { replace: true });
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
