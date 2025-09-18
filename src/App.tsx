import { Calculator, Loader } from 'lucide-react';
import { lazy, Suspense, useEffect, useState } from 'react';
import {
  EMISSION_FACTOR,
  ENERGY_COST,
  SAVINGS_PERCENTAGE,
} from './config/constants';
import { ErrorBoundaryComponent } from './error/ErrorBoundary';
import { usePostRecommendationsMutation } from './mutations/usePostRecomendationMutation';
import type { Result } from './types/energy';

const ResultsDisplay = lazy(() =>
  import('./components/ResultsDisplay').then((module) => ({
    default: module.ResultsDisplay,
  }))
);
// import { ResultsDisplay } from './components/ResultsDisplay'; // Keep this line commented out
// import { ErrorBoundaryComponent } from './error/ErrorBoundary';

export default function App() {
  const [kwh, setKwh] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [isLoadingCalculate, setIsLoadingCalculate] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const {
    mutateAsync: postRecommendationsAsync,
    isPending: isLoadingRecommendations,
    isError: isPostRecommendationError,
    error,
    data: recommendationData,
  } = usePostRecommendationsMutation();
  console.log('error :', error);

  const handleCalculate = async () => {
    if (!kwh || kwh <= 0) {
      setValidationMessage('Please enter a valid positive number for kWh.');
      return;
    }

    setIsLoadingCalculate(true);

    const energySaved = kwh * SAVINGS_PERCENTAGE;
    const co2Saved = energySaved * EMISSION_FACTOR;
    const moneySaved = energySaved * ENERGY_COST;

    setResult({
      energySaved: energySaved.toFixed(2),
      co2Saved: co2Saved.toFixed(2),
      moneySaved: moneySaved.toFixed(2),
    });

    setIsLoadingCalculate(false);

    await postRecommendationsAsync(kwh);

    setValidationMessage(null);
  };

  useEffect(() => {
    setValidationMessage(null);
  }, [kwh]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          Smart Energy Advisor ⚡
        </h1>
        <p className="mb-4 text-gray-600">
          Enter your monthly energy consumption (kWh) and see how small actions
          can generate savings, reduce CO₂ and costs.
        </p>
        <input
          type="number"
          value={kwh}
          onChange={(e) => setKwh(Number(e.target.value))}
          placeholder="Consumption in kWh"
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        <p className="text-sm text-gray-500 mb-8 italic">Consumption in kWh</p>

        {validationMessage && (
          <div className="text-red-500 mb-4">{validationMessage}</div>
        )}

        <button
          onClick={handleCalculate}
          disabled={isLoadingCalculate}
          className="bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoadingCalculate ? 'Calculating...' : 'Calculate'}
          <Calculator className="inline-block ml-2" />
        </button>

        <ErrorBoundaryComponent
          fallback={
            <div className="flex items-center gap-2">
              <p className="text-red-500 mt-4">Something went wrong.</p>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex items-center gap-2">
                <p className="text-primary">Loading recommendations...</p>
                <Loader className="animate-spin text-primary" />
              </div>
            }
          >
            {result && (
              <ResultsDisplay
                result={result}
                kwh={kwh}
                recommendation={recommendationData ?? ''}
                isLoadingRecommendation={isLoadingRecommendations}
                isRecommendationError={isPostRecommendationError}
              />
            )}
          </Suspense>
        </ErrorBoundaryComponent>
      </div>
    </div>
  );
}
