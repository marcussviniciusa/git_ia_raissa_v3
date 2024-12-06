import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().optional(),
});

const env = envSchema.parse(import.meta.env);

export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export async function chatCompletion(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
  if (!env.VITE_OPENAI_API_KEY) {
    throw new OpenAIError('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY in your environment.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new OpenAIError(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAIError) {
      throw error;
    }
    console.error('Error calling OpenAI:', error);
    throw new OpenAIError('Failed to communicate with OpenAI. Please try again later.');
  }
}