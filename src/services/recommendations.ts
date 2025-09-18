import axios from 'axios';
import { HUGGING_FACE_API_URL, HUGGING_FACE_TOKEN } from '../config/constants';

interface RecommendationResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      content_filter_results: {
        hate: {
          filtered: boolean;
        };
        self_harm: {
          filtered: boolean;
        };
        sexual: {
          filtered: boolean;
        };
        violence: {
          filtered: boolean;
        };
        jailbreak: {
          filtered: boolean;
          detected: boolean;
        };
        profanity: {
          filtered: boolean;
          detected: boolean;
        };
      };
    }
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: null;
    completion_tokens_details: null;
  };
  system_fingerprint: '';
}

export async function postRecommendation(kwh: number): Promise<string> {
  const prompt = `User consumes ${kwh} kWh/month. Give three practical energy-saving recommendations, following the list style with icons.`;

  const response = await axios.post<RecommendationResponse>(
    HUGGING_FACE_API_URL,
    payLoad(prompt),
    {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0]?.message.content ?? '';
}

const payLoad = (content: string) => ({
  messages: [
    {
      role: 'user',
      content: content,
    },
  ],
  model: 'Qwen/Qwen3-Next-80B-A3B-Instruct:novita',
  stream: false,
});
