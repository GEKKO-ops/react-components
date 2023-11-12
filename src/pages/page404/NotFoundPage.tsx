import { FC } from 'react';
import './notFound.css';

const NotFoundPage: FC = () => {
  return (
    <div className="not-found">
      <img
        src="../../assets/images/page404.png"
        alt="Not found"
      />
    </div>
  );
};

export default NotFoundPage;
