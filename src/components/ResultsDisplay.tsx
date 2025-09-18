import { AlertCircle } from 'lucide-react';
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
  //   isLoadingRecommendation,
  isRecommendationError,
}: ResultsDisplayProps) {
  const chartData = [
    { name: 'Current Consumption', kwh: kwh },
    { name: 'With Savings', kwh: kwh - Number(result?.energySaved) },
  ];

  return (
    <div className="mt-6 text-left">
      <h2 className="text-xl font-semibold text-green-700 mb-2">Results:</h2>
      <p className="text-gray-700">
        🔋 Estimated savings: <strong>{result.energySaved} kWh</strong>
      </p>
      <p className="text-gray-700">
        🌍 CO₂ avoided: <strong>{result.co2Saved} kg</strong>
      </p>
      <p className="text-gray-700">
        💰 Financial savings: <strong>R${result.moneySaved}</strong>
      </p>
      <p className="mt-4 text-sm text-gray-500 italic">
        *Estimation considering 10% energy savings.
      </p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Consumption Comparison (kWh)
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="kwh" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* {isLoadingRecommendation && !recommendationData && (
          <div className="flex items-center gap-2">
            <p className="text-primary">Loading recommendations...</p>
            <Loader className="animate-spin text-primary" />
          </div>
        )} */}

      {recommendationData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Recommendations:
          </h3>
          <ol className="list-decimal list-inside space-y-1">
            {parseIconRecommendations(recommendationData).map(
              (recommendation, index) => (
                <li className="" key={index}>
                  {/* <span className="text-2xl">
                    {recommendation.match(/^([\p{Emoji}])/u)?.[1]}
                  </span> */}
                  <span
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: recommendation.replace(/^([\p{Emoji}])\s*/u, ''),
                    }}
                  />
                </li>
              )
            )}
          </ol>
          {/* <p className="text-gray-700">{recommendationData}</p> */}
        </div>
      )}
      {isRecommendationError && (
        <div className="flex items-center gap-1 mt-2">
          <AlertCircle className="inline-block ml-2 text-red-500" />
          <div className="text-red-500 ">Error fetching recommendations</div>
        </div>
      )}
    </div>
  );
}
