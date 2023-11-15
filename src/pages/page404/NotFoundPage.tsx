import { FC } from 'react';
import image from '../../assets/images/page404.png';
import './notFound.css';

const NotFoundPage: FC = () => {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <img
        src={image}
        alt="404 img"
      />
    </div>
  );
};

export default NotFoundPage;
