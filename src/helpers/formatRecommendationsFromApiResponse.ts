// This file is intentionally left blank as the formatting logic has been moved to src/services/recommendations.ts
export function parseRecommendations(response: string) {
  if (!response) return [];

  //   return response
  //     .split('\n')
  //     .map((item) => item.trim())
  //     .filter((item) => /^([\p{Emoji}])\s*\*\*/u.test(item)); // linha que começa com emoji + bold

  return response
    .split('\n')
    .map((line) => {
      const match = line.match(/^([\p{Emoji}])\s*\*\*(.*?)\*\*\s*–\s*(.*)$/u);
      if (!match) return null;
      return {
        icon: match[1],
        title: match[2],
        description: match[3],
      };
    })
    .filter(Boolean);
}
