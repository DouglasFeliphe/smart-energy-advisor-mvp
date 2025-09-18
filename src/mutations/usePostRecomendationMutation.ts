import { useMutation } from '@tanstack/react-query';
import { postRecommendation } from '../services/recommendations';

export const usePostRecommendationsMutation = () => {
  return useMutation({
    mutationKey: ['recommendations'],
    mutationFn: (kwh: number) => postRecommendation(kwh),
  });
};
