import { FC } from 'react';
import Image from 'next/image';
import page404Image from '../public/page404.png';

const NotFoundPage: FC = () => {
  return (
    <div className="not_found">
      <h1>Page not found</h1>
      <Image
        src={page404Image}
        width={300}
        height={300}
        alt="Picture of the author"
      />
    </div>
  );
};

export default NotFoundPage;
