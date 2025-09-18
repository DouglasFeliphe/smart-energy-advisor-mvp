// This file is intentionally left blank as the formatting logic has been moved to src/services/recommendations.ts
export function parseIconRecommendations(response: string): string[] {
  if (!response) return [];
  // return response
  //   .split('-')
  //   .map((item) => item.trim())
  //   .filter((item) => item.length > 0);

  return response
    .split('\n')
    .map((item) => item.trim())
    .filter((item) => /^([\p{Emoji}])\s*\*\*/u.test(item)); // linha que começa com emoji + bold
}
