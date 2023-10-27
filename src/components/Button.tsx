import { Component } from 'react';

export interface IButtonProps {
  value: string;
  type: 'button' | 'submit' | 'reset';
  clickHandler?: React.MouseEventHandler;
  disabled?: boolean;
  extraClass?: string;
}

class Button extends Component<IButtonProps> {
  render() {
    return (
      <button
        // className={`button ${this.props.extraClass || ''}`}
        onClick={this.props.clickHandler}
        type={this.props.type}
        disabled={this.props.disabled}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Button;
