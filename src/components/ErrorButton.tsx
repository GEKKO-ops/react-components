import { Component } from 'react';
import Button from './Button';

class ErrorButton extends Component {
  state = { hasError: false };

  throwError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('This is a test error!');
    }
    return (
      <Button
        type="button"
        disabled={false}
        value="Throw Error"
        clickHandler={this.throwError}
      />
    );
  }
}

export default ErrorButton;
