"use client"

import { useState } from 'react';
import { summarizeProductReviews, type SummarizeProductReviewsOutput } from '@/ai/flows/product-review-summarizer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface Review {
  userName: string;
  rating: number;
  title: string;
  comment: string;
}

interface ReviewSummarizerProps {
  productName: string;
  reviews: Review[];
}

export function ReviewSummarizer({ productName, reviews }: ReviewSummarizerProps) {
  const [summary, setSummary] = useState<SummarizeProductReviewsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const result = await summarizeProductReviews({ productName, reviews });
      setSummary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!summary && !loading) {
    return (
      <div className="p-12 rounded-3xl border border-dashed border-primary/30 text-center bg-primary/5">
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="font-headline font-bold text-xl mb-2">Let AI read the reviews for you</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Our AI can analyze {reviews.length} customer reviews to give you a quick summary of pros and cons.</p>
        <Button onClick={handleSummarize} className="bg-primary hover:bg-primary/90 font-bold">
          Generate AI Summary
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-primary/20 bg-card overflow-hidden">
      <CardHeader className="bg-primary/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <CardTitle className="font-headline text-lg">AI Sentiment Analysis</CardTitle>
        </div>
        {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="text-muted-foreground animate-pulse">Analyzing customer feedback...</p>
          </div>
        ) : summary && (
          <>
            <div className="space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Overall Summary</h4>
              <p className="text-foreground leading-relaxed italic">"{summary.summary}"</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-sm uppercase tracking-widest text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> The Pros
                </h4>
                <ul className="space-y-2">
                  {summary.pros.map((pro, i) => (
                    <li key={i} className="text-sm bg-white/5 p-2 rounded-lg border-l-2 border-primary">{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-sm uppercase tracking-widest text-destructive flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> The Cons
                </h4>
                <ul className="space-y-2">
                  {summary.cons.map((con, i) => (
                    <li key={i} className="text-sm bg-white/5 p-2 rounded-lg border-l-2 border-destructive">{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
