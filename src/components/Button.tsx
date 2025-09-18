import { Calculator, Loader } from 'lucide-react';

interface ButtonProps {
  handleCalculate: () => Promise<void>;
  isLoadingCalculate: boolean;
  kwh: number;
}

export const Button = ({
  handleCalculate,
  isLoadingCalculate,
  kwh,
}: ButtonProps) => {
  return (
    <button
      onClick={handleCalculate}
      disabled={isLoadingCalculate || kwh <= 0}
      className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                     text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2 mx-auto font-medium animate-pulse"
    >
      {isLoadingCalculate ? (
        <>
          <Loader className="animate-spin h-5 w-5" />
          Calculating...
        </>
      ) : (
        <>
          Calculate
          <Calculator className="h-5 w-5" />
        </>
      )}
    </button>
  );
};
