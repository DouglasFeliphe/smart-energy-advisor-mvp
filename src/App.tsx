import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { MainContainer } from './components/MainContainer';
import { ResultsDisplay } from './components/ResultsDisplay';
import { EMISSION_FACTOR } from './config/constants';
import { ErrorBoundaryComponent } from './error/ErrorBoundary';
import { ErrorBoundaryFallback } from './error/Fallback';
import {
  calculateSavingsRate,
  calculateTariff,
  validateConsumption,
} from './functions/calculate';
import { usePostRecommendationsMutation } from './mutations/usePostRecomendationMutation';
import type { Result } from './types/energy';
import { Container } from './components/Container';
import { ButtonContainer } from './components/ButtonContainer';

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
    <MainContainer>
      <Container>
        <Header />

        <Input
          kwh={kwh}
          setKwh={setKwh}
          validationMessage={validationMessage}
        />

        <ButtonContainer>
          <Button
            handleCalculate={handleCalculate}
            isLoadingCalculate={isLoadingCalculate}
            kwh={kwh}
          />
        </ButtonContainer>

        <ErrorBoundaryComponent
          fallback={<ErrorBoundaryFallback text="Error loading results" />}
        >
          {result && !isLoadingCalculate && !isLoadingRecommendations && (
            <ResultsDisplay
              result={result}
              // result={{
              //   energySaved: result?.energySaved ?? '',
              //   co2Saved: result?.co2Saved ?? '',
              //   moneySaved: result?.moneySaved ?? '',
              // }}
              kwh={kwh}
              recommendation={recommendationData ?? ''}
              isLoadingRecommendation={isLoadingRecommendations}
              isRecommendationError={isPostRecommendationError}
            />
          )}
        </ErrorBoundaryComponent>
      </Container>
    </MainContainer>
  );
}
