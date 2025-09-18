export const EMISSION_FACTOR = 0.084; // ~84g CO₂/kWh
export const ENERGY_COST = 0.8; // R$0,80 per kWh
export const SAVINGS_PERCENTAGE = 0.1; // 10% savings estimation
export const HUGGING_FACE_API_URL = import.meta.env.VITE_HUGGING_FACE_API_URL;
export const HUGGING_FACE_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;

if (HUGGING_FACE_TOKEN) {
  console.log('HUGGING_FACE_TOKEN is set');
  console.log('HUGGING_FACE_API_URL :', HUGGING_FACE_API_URL);
}
