import { Component } from 'react';
import { IApi } from '../../utils/types/types';
import '../components.css';

interface HeroCardProps {
  item: IApi;
}

class ResultCard extends Component<HeroCardProps> {
  render() {
    return (
      <li
        className="result-item"
        key={this.props.item.id}
      >
        <p className="item-title">{this.props.item.name}</p>
        <div className="item-description">
          <p>{`gender: ${this.props.item.gender}`}</p>
          <p>{`species: ${this.props.item.species}`}</p>
          <p>{`status: ${this.props.item.status}`}</p>
        </div>
        <img
          src={this.props.item.image}
          alt={`${this.props.item.name}-image`}
        />
      </li>
    );
  }
}

export default ResultCard;
