import { AIRecommender } from '@/components/ai/AIRecommender';
import { Sparkles } from 'lucide-react';

export default function AIHelperPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> GenAI Powered
        </div>
        <h1 className="font-headline text-4xl md:text-6xl font-black">AI SMART <span className="gradient-text">FINDER</span></h1>
        <p className="text-muted-foreground text-lg">
          Not sure which phone fits your lifestyle? Chat with our specialist AI trained on the latest mobile specs and market trends.
        </p>
      </div>
      
      <AIRecommender />

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 rounded-2xl border bg-card/50">
          <h3 className="font-headline font-bold mb-2">Budget Conscious</h3>
          <p className="text-sm text-muted-foreground">The AI takes your price range into account to find the best value-for-money devices.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-card/50">
          <h3 className="font-headline font-bold mb-2">Usage Specific</h3>
          <p className="text-sm text-muted-foreground">Whether you're a pro photographer, hardcore gamer, or business power-user.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-card/50">
          <h3 className="font-headline font-bold mb-2">Ecosystem Ready</h3>
          <p className="text-sm text-muted-foreground">Find devices that work perfectly with your existing watches, tablets, and smart home.</p>
        </div>
      </div>
    </div>
  );
}
