import { ErrorBoundary } from 'react-error-boundary';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

const logErrorToMyService = (error: Error, info: ErrorInfo) => {
  console.error('Error:', error);
  console.error('Component stack:', info.componentStack);
};

export const ErrorBoundaryComponent = ({ children, fallback }: Props) => {
  return (
    <ErrorBoundary
      fallback={fallback}
      onError={logErrorToMyService}
      children={children}
    />
  );
};
