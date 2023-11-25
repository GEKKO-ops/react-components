import { useState } from 'react';
import CustomButton from '../CustomButton/CustomButton';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('This is a test error!');
  }

  return (
    <CustomButton
      type="button"
      disabled={false}
      value="Throw Error"
      clickHandler={throwError}
    />
  );
};

export default ErrorButton;
