import { FC } from 'react';
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
            <a
              href="!#"
              className="page-link"
              onClick={() => paginate(index)}
            >
              {index}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
