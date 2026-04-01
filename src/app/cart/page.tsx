
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/firebase';

export default function CartPage() {
  const { items, loading, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { user } = useUser();

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>جاري تحميل السلة...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-20 px-4 text-center space-y-6">
        <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground opacity-20" />
        <h1 className="text-3xl font-headline font-bold">يجب تسجيل الدخول</h1>
        <p className="text-muted-foreground">الرجاء تسجيل الدخول لمشاهدة سلة المشتريات الخاصة بك.</p>
        <Button asChild className="bg-primary px-8 h-12">
          <Link href="/login">تسجيل الدخول</Link>
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center space-y-6">
        <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground opacity-20" />
        <h1 className="text-3xl font-headline font-bold">السلة فارغة</h1>
        <p className="text-muted-foreground">لم تقم بإضافة أي منتجات بعد. ابدأ التسوق الآن!</p>
        <Button asChild className="bg-primary px-8 h-12">
          <Link href="/products">تصفح المنتجات</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8" dir="rtl">
      <h1 className="font-headline text-4xl font-black mb-12">سلة <span className="text-primary">المشتريات</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-card border rounded-2xl items-center">
              <div className="relative w-24 h-24 bg-background rounded-xl overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 space-y-1">
                <h3 className="font-headline font-bold text-lg">{item.name}</h3>
                <p className="text-primary font-bold text-xl">${item.price}</p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.productId, -1)}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, 1)}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="text-destructive text-sm flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border rounded-3xl p-8 h-fit space-y-6">
          <h2 className="font-headline text-2xl font-bold">ملخص السلة</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">التوصيل</span>
              <span className="text-green-500 font-bold">مجاني</span>
            </div>
            <Separator />
            <div className="flex justify-between text-xl font-black">
              <span>الإجمالي</span>
              <span>${totalPrice}</span>
            </div>
          </div>
          <Button asChild className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl">
            <Link href="/checkout">
              متابعة للدفع <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            تطبق الشروط والأحكام. التوصيل خلال 24 ساعة.
          </p>
        </div>
      </div>
    </div>
  );
}
