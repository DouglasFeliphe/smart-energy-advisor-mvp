// Energy calculation constants
export const EMISSION_FACTOR = 0.09; // 90g CO₂/kWh (Brazilian average)
export const BASE_ENERGY_COST = 0.8; // Base rate R$0.80/kWh

// Progressive savings rates based on consumption
export const SAVINGS_RATES = {
  LOW: 0.08, // 8% for consumption <= 200 kWh
  MEDIUM: 0.12, // 12% for consumption 201-500 kWh
  HIGH: 0.15, // 15% for consumption > 500 kWh
};

// Progressive tariff rates
export const TARIFF_RATES = {
  STANDARD: 0.8, // <= 300 kWh
  PREMIUM: 0.9, // > 300 kWh
};

// Validation limits
export const CONSUMPTION_LIMITS = {
  MIN: 1,
  MAX: 10000, // Reasonable maximum for residential consumption
};

export const HUGGING_FACE_API_URL = import.meta.env.VITE_HUGGING_FACE_API_URL;
export const HUGGING_FACE_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;

if (HUGGING_FACE_TOKEN) {
  console.log('HUGGING_FACE_TOKEN is set');
  console.log('HUGGING_FACE_API_URL :', HUGGING_FACE_API_URL);
}
