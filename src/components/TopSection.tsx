import { Component } from 'react';
import Input from './Input';
import Button from './Button';

class TopSection extends Component {
  render() {
    return (
      <>
        <Input value="type" />
        <Button
          type="submit"
          disabled={false}
          value="Submit"
        />
      </>
    );
  }
}

export default TopSection;
