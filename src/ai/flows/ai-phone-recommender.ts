/**
 * @fileOverview An AI assistant flow for recommending mobile phones based on user preferences.
 *
 * - aiPhoneRecommender - A function that handles the mobile phone recommendation process.
 * - AiPhoneRecommenderInput - The input type for the aiPhoneRecommender function.
 * - AiPhoneRecommenderOutput - The return type for the aiPhoneRecommender function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPhoneRecommenderInputSchema = z.object({
  conversationHistory: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({ text: z.string() })),
    })
  ).describe('Previous conversation turns between the user and the assistant.'),
  currentMessage: z.string().describe('The user\'s current message or request for a phone recommendation.'),
}).describe('Input for the AI phone recommender flow.');

export type AiPhoneRecommenderInput = z.infer<typeof AiPhoneRecommenderInputSchema>;

const AiPhoneRecommenderOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response, which can be a clarifying question or a phone recommendation.'),
  isRecommendation: z.boolean().describe('True if the response is a final phone recommendation, false if it\'s a clarifying question or needs more input.'),
}).describe('Output from the AI phone recommender flow.');

export type AiPhoneRecommenderOutput = z.infer<typeof AiPhoneRecommenderOutputSchema>;

const phoneRecommenderPrompt = ai.definePrompt({
  name: 'phoneRecommenderPrompt',
  input: { schema: AiPhoneRecommenderInputSchema },
  output: { schema: AiPhoneRecommenderOutputSchema },
  prompt: `You are an AI assistant specialized in recommending mobile phones.
Your goal is to help the user find the best phone for their needs.
If you have enough information, provide a specific phone recommendation including its brand, model, key features, estimated price, and why it fits their needs.
If you do not have enough information, ask a clarifying question about their preferences (e.g., budget, desired features like camera quality, battery life, screen size, operating system preference, usage patterns).

Here is the current conversation history:
{{#each conversationHistory}}
  {{this.role}}: {{#each this.parts}}{{this.text}}{{/each}}
{{/each}}

User's current request: {{{currentMessage}}}

Please provide your response in the specified JSON format, indicating whether it's a final recommendation or a question.
`,
});

const aiPhoneRecommenderFlow = ai.defineFlow(
  {
    name: 'aiPhoneRecommenderFlow',
    inputSchema: AiPhoneRecommenderInputSchema,
    outputSchema: AiPhoneRecommenderOutputSchema,
  },
  async (input) => {
    const {output} = await phoneRecommenderPrompt(input);
    return output!;
  }
);

export async function aiPhoneRecommender(input: AiPhoneRecommenderInput): Promise<AiPhoneRecommenderOutput> {
  return aiPhoneRecommenderFlow(input);
}
