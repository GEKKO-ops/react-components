import { Component } from 'react';

interface IApi {
  name: string;
}

class BottomSection extends Component {
  state = {
    isLoaded: false,
    items: [] as IApi[],
  };

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          isLoaded: true,
          items: data.results,
        });
      });
  }

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      );
    }
  }
}

export default BottomSection;
