import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import "../styles/layout/layout.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
