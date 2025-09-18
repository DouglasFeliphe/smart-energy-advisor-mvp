interface FallbackProps {
  text?: string;
}
export const ErrorBoundaryFallback = ({
  text = 'Something went wrong',
}: FallbackProps) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-red-500 flex items-center justify-center gap-2">
        <span className="inline-block w-5 h-5">❌</span>
        {text}
      </p>
    </div>
  );
};
