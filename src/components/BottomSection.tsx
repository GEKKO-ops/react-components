import { Component } from 'react';

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
    let url;
    if (queryParam) {
      url = `https://rickandmortyapi.com/api/character/?name=${queryParam}`;
    } else {
      url = 'https://rickandmortyapi.com/api/character/';
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.results,
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  };

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
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
