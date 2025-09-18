import { Calculator, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EMISSION_FACTOR } from './config/constants';
import { ErrorBoundaryComponent } from './error/ErrorBoundary';
import {
  calculateSavingsRate,
  calculateTariff,
  validateConsumption,
} from './functions/calculate';
import { usePostRecommendationsMutation } from './mutations/usePostRecomendationMutation';
import type { Result } from './types/energy';
import { ResultsDisplay } from './components/ResultsDisplay';

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
    // error,
    data: recommendationData,
  } = usePostRecommendationsMutation();

  const handleCalculate = async () => {
    setIsLoadingCalculate(true);

    const validationError = validateConsumption(kwh);

    if (validationError) {
      setValidationMessage(validationError);
      return;
    }

    try {
      // Calculate with progressive rates
      const savingsRate = calculateSavingsRate(kwh);
      const tariff = calculateTariff(kwh);

      const energySaved = kwh * savingsRate;
      const co2Saved = energySaved * EMISSION_FACTOR;
      const moneySaved = energySaved * tariff;

      setResult({
        energySaved: energySaved.toFixed(2),
        co2Saved: co2Saved.toFixed(2),
        moneySaved: moneySaved.toFixed(2),
      });

      await postRecommendationsAsync(kwh);
      setValidationMessage(null);
    } catch (error) {
      setValidationMessage('An error occurred during calculations.');
      console.error('Calculation error:', error);
    } finally {
      setIsLoadingCalculate(false);
    }
  };

  useEffect(() => {
    setValidationMessage(null);
    setResult(null);
  }, [kwh]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-200 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
            Smart Energy Advisor
            <span className="animate-pulse">⚡</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enter your monthly energy consumption (kWh) and see how small
            actions can generate savings, reduce CO<sub>2</sub> and costs.
          </p>
        </div>

        {/* Input Section */}
        <div className="relative max-w-md mx-auto">
          <div className="relative">
            <input
              type="number"
              value={kwh || ''}
              onChange={(e) => setKwh(Number(e.target.value))}
              placeholder="Enter your consumption"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
            />
            <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              kWh
            </span>
          </div>

          {validationMessage && (
            <div className="absolute -bottom-6 left-0 w-full">
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="inline-block w-4 h-4">⚠️</span>
                {validationMessage}
              </p>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <div className="pt-8 pb-12">
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
        </div>

        {/* Results Section */}
        <ErrorBoundaryComponent
          fallback={
            <div className="mt-8 text-center">
              <p className="text-red-500 flex items-center justify-center gap-2">
                <span className="inline-block w-5 h-5">❌</span>
                Something went wrong
              </p>
            </div>
          }
        >
          {/* <Suspense
            fallback={
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Loader className="animate-spin h-5 w-5" />
                  Loading recommendations...
                </div>
              </div>
            }
          > */}
          {result && !isLoadingCalculate && !isLoadingRecommendations && (
            <ResultsDisplay
              result={result}
              kwh={kwh}
              recommendation={recommendationData ?? ''}
              isLoadingRecommendation={isLoadingRecommendations}
              isRecommendationError={isPostRecommendationError}
            />
          )}
          {/* </Suspense> */}
        </ErrorBoundaryComponent>
      </div>
    </div>
  );
}
