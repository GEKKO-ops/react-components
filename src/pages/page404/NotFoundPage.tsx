import { FC } from 'react';
import image from '../../assets/images/page404.png';
import './notFound.css';

const NotFoundPage: FC = () => {
  return (
    <div className="not-found">
      <p></p>
      <img
        src={image}
        alt="Not found"
      />
    </div>
  );
};

export default NotFoundPage;
