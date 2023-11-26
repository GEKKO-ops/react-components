import { FC } from 'react';
import Image from 'next/image';

const NotFoundPage: FC = () => {
  return (
    <div className="not_found">
      <h1>Page not found</h1>
      <Image
        src="/page404.png"
        width={300}
        height={300}
        alt="404-img"
      />
    </div>
  );
};

export default NotFoundPage;
