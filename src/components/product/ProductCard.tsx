"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { type Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-card rounded-xl border border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(111,42,237,0.15)]">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-white/5">
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint="smartphone product"
          />
          {product.discount && (
            <Badge className="absolute top-3 left-3 bg-destructive text-white font-bold">
              -{product.discount}%
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-white/20"
            onClick={(e) => { e.preventDefault(); /* wishlist logic */ }}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.brand}</p>
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
          )}
        </div>

        <div className="pt-2 flex gap-2">
          <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg gap-2 h-9 text-xs">
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
