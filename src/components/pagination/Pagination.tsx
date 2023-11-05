import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
  const { page } = useParams();
  const [activeLink, setActiveLink] = useState(Number(page));
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalCard! / cardPerPage); i += 1) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((_, index) => (
          <li
            className="page-item"
            key={index}
          >
            <Link
              className={`page-link${
                activeLink === index + 1 ? ' active' : ''
              }`}
              to={`/search/page/${index + 1}`}
              onClick={() => {
                paginate(index + 1);
                setActiveLink(index + 1);
              }}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
