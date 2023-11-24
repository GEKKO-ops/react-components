import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from '../../styles/select.module.css';

interface SelectItemPerPageProps {
  totalCard: string;
}

const SelectItemPerPage: FC<SelectItemPerPageProps> = ({ totalCard }) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const query = { ...router.query, pageSize: event.target.value };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div>
      <label htmlFor="select">Cards per page:</label>
      <select
        className={styles.select}
        id="select"
        value={totalCard}
        onChange={handleChange}
      >
        <option value="20">20</option>
        <option value="60">60</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default SelectItemPerPage;
