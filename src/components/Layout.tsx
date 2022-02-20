import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='antialiased tracking-tighter text-gray-700 bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-700 min-h-screen overflow-y-hidden'>
      <div className='px-4 sm:max-w-xl mx-auto py-14'>{children}</div>
    </div>
  );
}

export default Layout;
