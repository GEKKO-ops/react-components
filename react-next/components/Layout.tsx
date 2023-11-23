import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="main-wrap">{children}</div>;
};

export default Layout;
