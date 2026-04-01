import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS, CATEGORIES, BRANDS } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="font-headline text-4xl font-black">THE <span className="text-primary">VAULT</span></h1>
          <p className="text-muted-foreground">Browse our elite collection of smartphones.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search catalog..." className="pl-10 h-11 bg-card/50" />
          </div>
          <Button variant="outline" className="h-11 gap-2 bg-card/50">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block space-y-8">
          <div>
            <h3 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest">Category</h3>
            <div className="space-y-2">
              {CATEGORIES.map(c => (
                <label key={c} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest">Brand</h3>
            <div className="space-y-2">
              {BRANDS.map(b => (
                <label key={b} className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground">{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest">Price Range</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input placeholder="Min" className="h-9" />
                <Input placeholder="Max" className="h-9" />
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
