import React from 'react';

interface ButtonContainerProps {
  children: React.ReactNode;
}

export const ButtonContainer = ({ children }: ButtonContainerProps) => {
  return <div className="pt-8 pb-12">{children}</div>;
};
