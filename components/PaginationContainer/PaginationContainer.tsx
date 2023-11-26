import { FC } from 'react';
import getPageNumbers from '../../utils/getPageNumber';
import styles from '../../styles/pagination.module.css';
import { useRouter } from 'next/router';

export interface PaginationProps {
  cardPerPage: number;
  totalCard: number | undefined;
  page: string;
}

const PaginationContainer: FC<PaginationProps> = ({
  cardPerPage,
  totalCard,
  page,
}) => {
  const totalPages = Math.ceil(totalCard! / cardPerPage);
  const displayLimit = 10;
  const start = Math.max(1, Number(page) - Math.floor(displayLimit / 2));
  const end = Math.min(Number(page) + Math.floor(displayLimit / 2), totalPages);
  const createArray = (N: number) =>
    Array.from({ length: N }, (_, index) => index + 1);
  const pageNumbers = createArray(totalPages);
  const router = useRouter();

  const newPageNumbers: (number | string)[] = getPageNumbers(
    pageNumbers,
    page,
    totalPages,
    displayLimit,
    start,
    end,
    totalCard
  );

  const handlePageChange = (pageNumber: string) => {
    const query = { ...router.query, page: pageNumber };
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div>
      <ul className={styles.pagination}>
        {newPageNumbers.map((number, index) => (
          <li
            className="page-item"
            key={index}
          >
            {number === '...' ? (
              <span className={styles.span}>...</span>
            ) : (
              <div
                data-testid="link"
                className={`${styles.custom_link} ${
                  number === Number(page) ? styles.active : ''
                }`}
                onClick={() => {
                  handlePageChange(number.toString());
                }}
              >
                {number}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationContainer;
