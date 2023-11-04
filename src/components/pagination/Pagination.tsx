import { FC } from 'react';
import { Link } from 'react-router-dom';
import './pagination.css';
interface PaginationProps {
  cardPerPage: number;
  totalCard: number | undefined;
  paginate: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  cardPerPage,
  totalCard,
  paginate,
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalCard! / cardPerPage); i += 1) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((index) => (
          <li
            className="page-item"
            key={index}
          >
            <Link
              className="page-link"
              to={`/search/page/${index}`}
              onClick={() => paginate(index)}
            >
              {index}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
