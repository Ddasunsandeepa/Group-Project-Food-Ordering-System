import React from 'react';
import Header from '../components/Header/Header';
import Footer from '@/components/Footer/Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col overflow-x-hidden font-lato">
      <Header />
      <main className="flex-1 w-full flex justify-center items-start">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
