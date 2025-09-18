import {
  AlertCircle,
  DollarSign,
  Info,
  Leaf,
  Lightbulb,
  TrendingDown,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Result } from '../types/energy';
import { parseIconRecommendations } from '../helpers/formatRecommendationsFromApiResponse';
import { calculateSavingsRate } from '../functions/calculate';
import { SAVINGS_RATES, TARIFF_RATES } from '../config/constants';
import { useState } from 'react';

type ResultsDisplayProps = {
  result: Result;
  kwh: number;
  recommendation: string;
  isLoadingRecommendation: boolean;
  isRecommendationError: boolean;
};

export function ResultsDisplay({
  result,
  kwh,
  recommendation: recommendationData,
  isRecommendationError,
}: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'details' | 'recommendations'
  >('overview');

  const chartData = [
    { name: 'Current', kwh: kwh },
    { name: 'Optimized', kwh: kwh - Number(result?.energySaved) },
  ];

  const currentSavingsRate = calculateSavingsRate(kwh);
  const savingsPercentage = currentSavingsRate * 100;
  const tariffRate = kwh > 300 ? TARIFF_RATES.PREMIUM : TARIFF_RATES.STANDARD;

  const getSavingsTierColor = () => {
    if (kwh <= 200) return 'text-yellow-600';
    if (kwh <= 500) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="mt-6 text-left ">
      {/* Tabs Navigation */}
      <div className="flex space-x-2 mb-6 pb-2 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'details'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'recommendations'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
        >
          Recommendations
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-green-700 font-medium">Energy Savings</h3>
                <Lightbulb className="text-green-600 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-green-700 mt-2">
                {result.energySaved} kWh
              </p>
              <p className="text-sm text-green-600 mt-1">
                {savingsPercentage}% reduction potential
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-blue-700 font-medium">CO₂ Reduction</h3>
                <Leaf className="text-blue-600 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-blue-700 mt-2">
                {result.co2Saved} kg
              </p>
              <p className="text-sm text-blue-600 mt-1">Environmental impact</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-purple-700 font-medium">Cost Savings</h3>
                <DollarSign className="text-purple-600 h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-purple-700 mt-2">
                R${result.moneySaved}
              </p>
              <p className="text-sm text-purple-600 mt-1">Monthly reduction</p>
            </div>
          </div>

          {/* Consumption Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Consumption Comparison
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="kwh"
                  fill="#16a34a"
                  radius={[8, 8, 0, 0]}
                  name="kWh"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Consumption Details */}
          {/* Consumption Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Consumption Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Current Consumption</span>
                  <Info
                    className="h-4 w-4 text-gray-400 cursor-help"
                    aria-label="Current monthly energy consumption in kWh"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{kwh}</span>
                  <span className="text-gray-500">kWh</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Tariff Rate</span>
                  <Info
                    className="h-4 w-4 text-gray-400 cursor-help"
                    aria-label="Current energy price per kWh"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    R$ {tariffRate.toFixed(2)}
                  </span>
                  <span className="text-gray-500">/kWh</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Consumption Tier</span>
                  <Info
                    className="h-4 w-4 text-gray-400 cursor-help"
                    aria-label="Your consumption category based on monthly usage"
                  />
                </div>
                <span className={`font-medium ${getSavingsTierColor()}`}>
                  {kwh <= 200 ? 'Basic' : kwh <= 500 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>
          </div>

          {/* Savings Tiers Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
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
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Personalized Recommendations
          </h3>
          {recommendationData ? (
            <div className="space-y-4">
              {parseIconRecommendations(recommendationData).map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="p-4 bg-green-50 rounded-lg border border-green-100"
                  >
                    <span
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: recommendation.replace(
                          /^([\p{Emoji}])\s*/u,
                          '$1 '
                        ),
                      }}
                    />
                  </div>
                )
              )}
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
