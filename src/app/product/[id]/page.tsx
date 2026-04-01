
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Star, ShieldCheck, Truck, RotateCcw, Cpu, Smartphone, Camera, Battery, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/mock-data';
import { ReviewSummarizer } from '@/components/product/ReviewSummarizer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  // Mock reviews for the summarizer
  const mockReviews = [
    { userName: "Alex J.", rating: 5, title: "Pure Excellence", comment: "The display is incredible. Everything is so smooth. The battery easily lasts a full day and then some." },
    { userName: "Sarah M.", rating: 4, title: "Great but expensive", comment: "I love the build quality, but the price is really steep compared to the previous model." },
    { userName: "Mike T.", rating: 5, title: "Incredible Camera", comment: "The low light photos are stunning. Best smartphone camera I have ever used." },
    { userName: "Chris L.", rating: 3, title: "Overheating issues", comment: "Sometimes gets quite warm during long gaming sessions, but it recovers quickly." }
  ];

  const specs = [
    { icon: Cpu, label: "Processor", value: product.specs.processor },
    { icon: Smartphone, label: "Display", value: product.specs.screen },
    { icon: Camera, label: "Camera", value: product.specs.camera },
    { icon: Battery, label: "Battery", value: product.specs.battery },
    { icon: Zap, label: "Memory", value: `${product.specs.ram} / ${product.specs.storage}` },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-card border border-primary/10">
            <Image 
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary cursor-pointer transition-colors">
                <Image src={`https://picsum.photos/seed/phone${i}/400/400`} alt="Gallery" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary text-primary">{product.brand}</Badge>
              <div className="flex items-center gap-1 text-sm font-bold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span className="text-muted-foreground font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-black">{product.name}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">${product.oldPrice}</span>
            )}
          </div>

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

          <Separator className="bg-border/50" />

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-right" dir="rtl">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">توصيل مجاني</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">ضمان سنتين</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">إرجاع خلال 30 يوم</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <section className="mt-24">
        <h2 className="font-headline text-3xl font-bold mb-10">المواصفات <span className="text-primary">التقنية</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {specs.map((spec, i) => (
            <div key={i} className="bg-card p-6 rounded-2xl border border-primary/10 flex flex-col items-center text-center space-y-3">
              <spec.icon className="w-8 h-8 text-primary" />
              <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">{spec.label}</p>
              <p className="font-medium">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Review Summary Section */}
      <section className="mt-24 space-y-10">
        <h2 className="font-headline text-3xl font-bold">مراجعات <span className="text-primary">المستخدمين</span></h2>
        <ReviewSummarizer productName={product.name} reviews={mockReviews} />
      </section>
    </div>
  );
}
