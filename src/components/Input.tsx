import React from 'react';

interface InputProps {
  kwh: number;
  setKwh: React.Dispatch<React.SetStateAction<number>>;
  validationMessage: string | null;
}

export const Input = ({ kwh, setKwh, validationMessage }: InputProps) => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <input
          type="number"
          value={kwh || ''}
          onChange={(e) => setKwh(Number(e.target.value))}
          placeholder="Enter your consumption"
          className="bg-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none focus:text-green-500"
        />
        <span className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          kWh
        </span>
      </div>

      {validationMessage && (
        <div className="absolute bottom-6 left-0 w-full">
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="inline-block w-4 h-4">⚠️</span>
            {validationMessage}
          </p>
        </div>
      )}
    </div>
  );
};
