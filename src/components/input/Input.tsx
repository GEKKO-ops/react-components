import { FC } from 'react';

interface IInputProps {
  value: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<IInputProps> = ({ value, changeHandler }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={changeHandler}
    />
  );
};

export default Input;
