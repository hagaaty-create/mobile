"use client"

import { useState, useRef, useEffect } from 'react';
import { aiPhoneRecommender } from '@/ai/flows/ai-phone-recommender';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cpu, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function AIRecommender() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Hello! I'm your TechVault AI assistant. Tell me, what kind of phone are you looking for today? (e.g., 'A phone with the best camera for under $1000')" }] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    const newHistory: Message[] = [...messages, { role: 'user', parts: [{ text: userMsg }] }];
    setMessages(newHistory);
    setLoading(true);

    try {
      const result = await aiPhoneRecommender({
        conversationHistory: messages,
        currentMessage: userMsg
      });

      setMessages([...newHistory, { role: 'model', parts: [{ text: result.response }] }]);
    } catch (error) {
      console.error(error);
      setMessages([...newHistory, { role: 'model', parts: [{ text: "I'm sorry, I encountered an error. Please try again." }] }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto rounded-3xl border border-primary/20 bg-card/50 overflow-hidden shadow-2xl">
      <div className="p-6 border-b flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-lg leading-none">Phone Finder AI</h2>
            <p className="text-xs text-muted-foreground mt-1">Smart Personalized Recommendations</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-accent animate-pulse" />
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-accent' : 'bg-primary'}`}>
                {m.role === 'user' ? <User className="w-4 h-4 text-accent-foreground" /> : <Bot className="w-4 h-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm ${m.role === 'user' ? 'bg-accent text-accent-foreground rounded-tr-none' : 'bg-secondary rounded-tl-none text-foreground'}`}>
                {m.parts[0].text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-none p-4 flex items-center">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t bg-card">
        <div className="flex gap-2">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your preferences..."
            className="bg-background border-border"
          />
          <Button onClick={handleSend} disabled={loading} className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 text-center uppercase tracking-widest font-bold">
          Powered by Gemini 2.5 Flash
        </p>
      </div>
    </div>
  );
}
