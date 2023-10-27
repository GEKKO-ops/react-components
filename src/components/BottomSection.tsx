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

  fetchData = (queryParam: string) => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${queryParam}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.results,
        });
      });
  };

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <p>{item.gender}</p>
              <p>{item.species}</p>
              <p>{item.status}</p>
              <img
                src={item.image}
                alt={`${item.name}-image`}
              />
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default BottomSection;
