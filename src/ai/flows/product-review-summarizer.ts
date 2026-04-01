'use server';
/**
 * @fileOverview A Genkit flow for summarizing product reviews.
 *
 * - summarizeProductReviews - A function that handles the review summarization process.
 * - SummarizeProductReviewsInput - The input type for the summarizeProductReviews function.
 * - SummarizeProductReviewsOutput - The return type for the summarizeProductReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewSchema = z.object({
  userName: z.string().describe('The name of the user who wrote the review.'),
  rating: z.number().min(1).max(5).describe('The rating given by the user (1-5).'),
  title: z.string().describe('The title of the review.'),
  comment: z.string().describe('The full text of the review comment.'),
});

const SummarizeProductReviewsInputSchema = z.object({
  productName: z.string().describe('The name of the product being reviewed.'),
  reviews: z.array(ReviewSchema).min(1).describe('An array of customer reviews for the product.'),
});
export type SummarizeProductReviewsInput = z.infer<typeof SummarizeProductReviewsInputSchema>;

const SummarizeProductReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise overall summary of the reviews.'),
  pros: z.array(z.string()).describe('A list of key advantages or positive points mentioned in the reviews.'),
  cons: z.array(z.string()).describe('A list of key disadvantages or negative points mentioned in the reviews.'),
});
export type SummarizeProductReviewsOutput = z.infer<typeof SummarizeProductReviewsOutputSchema>;

export async function summarizeProductReviews(input: SummarizeProductReviewsInput): Promise<SummarizeProductReviewsOutput> {
  return summarizeProductReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProductReviewsPrompt',
  input: {schema: SummarizeProductReviewsInputSchema},
  output: {schema: SummarizeProductReviewsOutputSchema},
  prompt: `You are an expert product review summarizer. Your task is to analyze a collection of customer reviews for a product and extract the main sentiment, key pros, and key cons.

Product Name: {{{productName}}}

Customer Reviews:
{{#each reviews}}
- User: {{{userName}}}, Rating: {{{rating}}}/5
  Title: {{{title}}}
  Comment: {{{comment}}}
{{/each}}

Based on these reviews, provide a concise summary, a list of key pros, and a list of key cons for the product.`,
});

const summarizeProductReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeProductReviewsFlow',
    inputSchema: SummarizeProductReviewsInputSchema,
    outputSchema: SummarizeProductReviewsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to summarize product reviews.');
    }
    return output;
  }
);
