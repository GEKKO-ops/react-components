import { Component } from 'react';

interface IInputProps {
  value: string;
}

class Input extends Component<IInputProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
      />
    );
  }
}
export default Input;
