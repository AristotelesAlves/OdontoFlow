
import React from 'react';
import './layout.css'; 

const RootLayout = ({ children }) => {
  return (
    <div className="root-layout">
      <header>
      </header>
      <main>{children}</main>
      <footer>
      </footer>
    </div>
  );
};

export default RootLayout;
