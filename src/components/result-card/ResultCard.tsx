import { FC } from 'react';
import { IApi } from '../../utils/types/types';
import '../components.css';

interface HeroCardProps {
  item: IApi;
}

const ResultCard: FC<HeroCardProps> = ({ item }) => {
  return (
    <li
      className="result-item"
      key={item.id}
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
