import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
