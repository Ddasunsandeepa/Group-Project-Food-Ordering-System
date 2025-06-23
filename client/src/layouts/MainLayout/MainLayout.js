import React from 'react';
import './MainLayout.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
