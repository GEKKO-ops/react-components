import { Component } from 'react';

interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

class Input extends Component<IInputProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.changeHandler}
      />
    );
  }
}
export default Input;
