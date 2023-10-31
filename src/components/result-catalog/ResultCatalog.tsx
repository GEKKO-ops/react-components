import { Component } from 'react';
import { fetchData } from '../../service/apiService';

interface IApi {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface BottomSectionProps {
  queryParam: string;
}

class BottomSection extends Component<BottomSectionProps> {
  state = {
    isLoaded: false,
    items: [] as IApi[],
    hasError: false,
  };

  componentDidMount() {
    this.fetchData(this.props.queryParam);
  }

  componentDidUpdate(prevProps: BottomSectionProps) {
    if (this.props.queryParam !== prevProps.queryParam) {
      this.fetchData(this.props.queryParam);
    }
  }

  fetchData = (queryParam: string | undefined) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        isLoaded: false,
        hasError: false,
      }),
      () => {
        fetchData(queryParam)
          .then((data) => {
            this.setState({
              isLoaded: true,
              items: data.results,
              hasError: false,
            });
          })
          .catch((error) => {
            console.error('Fetch error:', error);
            this.setState({
              hasError: true,
            });
          });
      }
    );
  };

  render() {
    const { isLoaded, items, hasError } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    if (hasError) {
      return <div>Oops, nothing found!!!</div>;
    } else {
      return (
        <div className="section main-section">
          <h2>Serch results:</h2>
          <ul className="result-list">
            {items.map((item, index) => (
              <li
                className="result-item"
                key={index}
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
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default BottomSection;
