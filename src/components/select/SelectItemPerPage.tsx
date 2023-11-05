import { FC } from 'react';
import './select.css';

interface SelectItemPerPageProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalCard: string;
}

const SelectItemPerPage: FC<SelectItemPerPageProps> = (props) => {
  return (
    <div>
      <label htmlFor="select">Cards per page:</label>
      <select
        className="select"
        id="select"
        value={props.totalCard}
        onChange={props.handleChange}
      >
        <option value="20">20</option>
        <option value="60">60</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default SelectItemPerPage;
