import React from 'react';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200 p-0 sm:p-6 md:p-6 lg:p-6 xl:p-6">
      {children}
    </div>
  );
};
