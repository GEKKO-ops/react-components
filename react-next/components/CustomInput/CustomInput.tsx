import { FC } from 'react';

interface IInputProps {
  value: string;
  placeholder: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomInput: FC<IInputProps> = ({
  value,
  placeholder,
  changeHandler,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={changeHandler}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
