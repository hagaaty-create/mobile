"use client"

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { type Product } from '@/lib/mock-data';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        size="lg" 
        className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 flex-1"
        onClick={() => addToCart(product)}
      >
        إضافة إلى سلة المشتريات
      </Button>
      <Button size="lg" variant="outline" className="h-14 px-6 border-primary/20">
        المفضلة
      </Button>
    </div>
  );
}
