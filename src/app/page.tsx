import Link from 'next/link';
import { ArrowRight, Cpu, Sparkles, ShieldCheck, Zap, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/mock-data';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-1.5 text-sm mb-4 animate-pulse">
            New Arrivals: iPhone 15 Series & Galaxy S24
          </Badge>
          <h1 className="font-headline text-5xl md:text-8xl font-black tracking-tighter leading-none">
            UNLEASH THE <span className="gradient-text">FUTURE</span> <br />
            IN YOUR HANDS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Discover the world's most advanced smartphones, curated for those who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary hover:bg-primary/90">
                Explore Shop <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/ai-helper">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-primary/50 hover:bg-primary/5">
                <Sparkles className="mr-2 w-5 h-5 text-accent" /> AI Phone Finder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 border-y bg-card/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Zap, title: "Super Fast Delivery", desc: "Get your device in 24 hours" },
            { icon: ShieldCheck, title: "Official Warranty", desc: "2 years comprehensive cover" },
            { icon: Cpu, title: "Tech Experts", desc: "Pre-checked for perfection" },
            { icon: Sparkles, title: "Exclusive Offers", desc: "Only for TechVault members" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border hover:border-primary/30 transition-colors">
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-headline font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl md:text-5xl font-bold">Featured <span className="text-primary">Mobiles</span></h2>
            <p className="text-muted-foreground">The most trending devices selected just for you.</p>
          </div>
          <Link href="/products" className="text-primary hover:underline flex items-center gap-2 font-bold">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI CTA Banner */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-[#2d2436] p-12 md:p-20 text-center border border-primary/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(111,42,237,0.3),transparent)]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="font-headline text-4xl md:text-6xl font-black italic">CONFUSED WHICH ONE TO BUY?</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Let our advanced AI analyze your usage patterns, budget, and preferences to find the perfect smartphone match.
            </p>
            <Link href="/ai-helper">
              <Button size="lg" className="h-14 px-10 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
                Start AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
