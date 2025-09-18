import { SAVINGS_RATES, TARIFF_RATES } from '../config/constants';

export const calculateSavingsRate = (kwh: number): number => {
  if (kwh > 500) return SAVINGS_RATES.HIGH;
  if (kwh > 200) return SAVINGS_RATES.MEDIUM;
  return SAVINGS_RATES.LOW;
};

export const calculateTariff = (kwh: number): number => {
  return kwh > 300 ? TARIFF_RATES.PREMIUM : TARIFF_RATES.STANDARD;
};

export const validateConsumption = (kwh: number): string | null => {
  if (!kwh || kwh <= 0) {
    return 'Please enter a valid positive number for kWh.';
  }
  if (kwh > 10000) {
    return 'The consumption value seems too high for a residential property.';
  }
  return null;
};
