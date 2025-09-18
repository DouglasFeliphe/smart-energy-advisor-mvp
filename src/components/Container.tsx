import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
      {children}
    </div>
  );
};
