import { FC } from 'react';
import getPageNumbers from '../../utils/getPageNumber';
import Link from 'next/link';

interface PaginationProps {
  cardPerPage: number;
  totalCard: number | undefined;
  page: string;
}

const PaginationContainer: FC<PaginationProps> = ({
  cardPerPage,
  totalCard,
  page,
}) => {
  // const { page } = useParams();
  const totalPages = Math.ceil(totalCard! / cardPerPage);
  const displayLimit = 10;
  const start = Math.max(1, Number(page) - Math.floor(displayLimit / 2));
  const end = Math.min(Number(page) + Math.floor(displayLimit / 2), totalPages);
  const createArray = (N: number) =>
    Array.from({ length: N }, (_, index) => index + 1);
  const pageNumbers = createArray(totalPages);

  const newPageNumbers: (number | string)[] = getPageNumbers(
    pageNumbers,
    page,
    totalPages,
    displayLimit,
    start,
    end,
    totalCard
  );

  return (
    <div>
      <ul className="pagination">
        {newPageNumbers.map((number, index) => (
          <li
            className="page-item"
            key={index}
          >
            {number === '...' ? (
              <span>...</span>
            ) : (
              <Link
                className={`page-link${
                  number === Number(page) ? ' active' : ''
                }`}
                href={`/search/page/${number}`}
              >
                {number}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaginationContainer;
