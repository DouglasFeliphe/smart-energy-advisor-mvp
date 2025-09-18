import { AlertCircle, Info, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import type { Result } from '../../types/energy';
import { calculateSavingsRate } from '../../functions/calculate';
import { SAVINGS_RATES, TARIFF_RATES } from '../../config/constants';
import { SummaryCards } from './SummaryCards';
import { ConsumptionChart } from './ConsumptionChart';
import { parseRecommendations } from '../../helpers/formatRecommendationsFromApiResponse';
import { Tabs } from './Tabs';

type ResultsDisplayProps = {
  result: Result;
  kwh: number;
  recommendation: string;
  isLoadingRecommendation: boolean;
  isRecommendationError: boolean;
};

const TABS = ['overview', 'details', 'recommendations'] as const;

//extract the tab type from TABS
type TabType = (typeof TABS)[number];

export function ResultsDisplay({
  result,
  kwh,
  recommendation: recommendationData,
  isRecommendationError,
}: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  function handleActiveTab(tab: TabType) {
    setActiveTab(tab);
  }

  const getSavingsTierColor = () => {
    if (kwh <= 200) return 'text-yellow-600';
    if (kwh <= 500) return 'text-orange-600';
    return 'text-red-600';
  };

  const formatNumber = (value: number): number => {
    return Number(value.toFixed(2));
  };

  const chartData = [
    { name: 'Current', kwh: kwh },
    {
      name: 'Optimized',
      kwh: formatNumber(kwh - Number(result?.energySaved)),
    },
  ];

  const currentSavingsRate = calculateSavingsRate(kwh);
  const savingsPercentage = currentSavingsRate * 100;
  const tariffRate = kwh > 300 ? TARIFF_RATES.PREMIUM : TARIFF_RATES.STANDARD;

  return (
    <div className="mt-6 text-left ">
      <Tabs tabs={[...TABS]} activeTab={activeTab} onClick={handleActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <SummaryCards
            result={{
              energySaved: result.energySaved,
              co2Saved: result.co2Saved,
              moneySaved: result.moneySaved,
            }}
            savingsPercentage={savingsPercentage}
          />

          <ConsumptionChart
            title={'Consumption Comparison'}
            chartData={chartData}
          />
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Consumption Details */}
          <div className="bg-white rounded-xl  px-0 py-6 sm:px6 md:px-6 lg:px-6 xl:px-6   shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Consumption Details
              </h3>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Current Consumption</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-600">{kwh}</span>
                  <span className="text-gray-500">kWh</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tariff Rate</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-600">
                    R$ {tariffRate.toFixed(2)}
                  </span>
                  <span className="text-gray-500">/kWh</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Consumption Tier</span>
                </div>
                <span className={`font-medium ${getSavingsTierColor()}`}>
                  {kwh <= 200 ? 'Basic' : kwh <= 500 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>
          </div>

          {/* Savings Tiers Information */}
          <div className="bg-white rounded-xl px-0 py-6 sm:px6 md:px-6 lg:px-6 xl:px-6  shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Savings Tiers
              </h3>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700">Basic Tier (≤ 200 kWh)</span>
                <span className="font-medium text-yellow-700">
                  {SAVINGS_RATES.LOW * 100}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700">
                  Medium Tier (201-500 kWh)
                </span>
                <span className="font-medium text-orange-700">
                  {SAVINGS_RATES.MEDIUM * 100}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-red-700">
                  High Tier (`${'>'}` 500 kWh)
                </span>
                <span className="font-medium text-red-700">
                  {SAVINGS_RATES.HIGH * 100}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="bg-white rounded-xl px-0 py-6 sm:px6 md:px-6 lg:px-6 xl:px-6  shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Personalized Recommendations
          </h3>
          {recommendationData ? (
            <div className="space-y-4">
              {parseRecommendations(recommendationData).map((rec, idx) => {
                return (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-2xl ">{rec?.icon}</span>
                    <div>
                      <span className="font-bold text-gray-700">
                        {rec?.title}:
                      </span>
                      <p className="text-gray-700">{rec?.description}</p>
                    </div>
                  </li>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TrendingDown className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>No recommendations available at this time.</p>
            </div>
          )}

          {isRecommendationError && (
            <div className="flex items-center gap-2 mt-4 p-4 bg-red-50 rounded-lg text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>Unable to load recommendations. Please try again later.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
