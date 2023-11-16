import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import './pagination.css';
interface PaginationProps {
  cardPerPage: number;
  totalCard: number | undefined;
}

const Pagination: FC<PaginationProps> = ({ cardPerPage, totalCard }) => {
  const { page } = useParams();
  const totalPages = Math.ceil(totalCard! / cardPerPage);
  const pageNumbers = [];
  const displayLimit = 10;
  const start = Math.max(1, Number(page) - Math.floor(displayLimit / 2));
  const end = Math.min(Number(page) + Math.floor(displayLimit / 2), totalPages);
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  let newPageNumbers: (number | string)[] = [];
  if (totalPages > displayLimit) {
    if (Number(page) < Math.floor(displayLimit / 2) + 1) {
      newPageNumbers = pageNumbers.slice(0, displayLimit);
      newPageNumbers.push('...');
    } else if (Number(page) > totalCard! - Math.floor(displayLimit / 2)) {
      newPageNumbers = [1, '...'].concat(
        pageNumbers.slice(totalPages - displayLimit + 1)
      );
    } else {
      newPageNumbers = [1, '...'].concat(pageNumbers.slice(start, end));
      newPageNumbers.push('...');
      newPageNumbers.push(totalPages);
    }
  } else {
    newPageNumbers = pageNumbers.slice(0, totalPages);
  }

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
                to={`/search/page/${number}`}
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

export default Pagination;
