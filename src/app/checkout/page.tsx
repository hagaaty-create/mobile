
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { useUser, useFirestore } from '@/firebase';
import { doc, collection, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [address, setAddress] = useState({
    city: '',
    district: '',
    street: '',
    building: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  if (items.length === 0 && !success) {
    router.push('/cart');
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!user || !firestore) return;
    if (!address.city || !address.street) {
      toast({
        variant: 'destructive',
        title: 'بيانات ناقصة',
        description: 'يرجى إكمال بيانات العنوان.',
      });
      return;
    }

    setLoading(true);
    const orderId = doc(collection(firestore, 'orders')).id;
    const orderRef = doc(firestore, 'users', user.uid, 'orders', orderId);

    const orderData = {
      id: orderId,
      userId: user.uid,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: totalPrice,
      shippingAddress: address,
      paymentMethod,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(orderRef, orderData);
      
      // Clear cart in Firestore
      const batch = writeBatch(firestore);
      items.forEach(item => {
        const itemRef = doc(firestore, 'users', user.uid, 'cart', item.productId);
        batch.delete(itemRef);
      });
      await batch.commit();

      setSuccess(true);
      toast({
        title: 'تم الطلب بنجاح',
        description: 'سيتم التواصل معك لتأكيد التوصيل.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: 'حدث خطأ أثناء إتمام الطلب.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto py-24 px-4 text-center space-y-8">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-headline font-black">تم استلام <span className="text-primary">طلبك!</span></h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          شكراً لتسوقك من TechVault. رقم طلبك هو <span className="text-foreground font-bold font-code">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>. سنقوم بتوصيل هاتفك الجديد خلال 24 ساعة.
        </p>
        <Button asChild size="lg" className="bg-primary px-10 h-14 text-lg">
          <a href="/products">العودة للتسوق</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8" dir="rtl">
      <h1 className="font-headline text-4xl font-black mb-12">إتمام <span className="text-primary">الشراء</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          {/* Shipping Address */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-headline font-bold">عنوان التوصيل</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>المدينة</Label>
                <Input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="مثلاً: القاهرة" className="bg-card" />
              </div>
              <div className="space-y-2">
                <Label>الحي / المنطقة</Label>
                <Input value={address.district} onChange={e => setAddress({...address, district: e.target.value})} placeholder="مثلاً: مدينة نصر" className="bg-card" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>الشارع</Label>
                <Input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="اسم الشارع" className="bg-card" />
              </div>
              <div className="space-y-2">
                <Label>رقم المبنى / الدور</Label>
                <Input value={address.building} onChange={e => setAddress({...address, building: e.target.value})} placeholder="المبنى والدور" className="bg-card" />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-headline font-bold">طريقة الدفع</h2>
            </div>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'bg-card'}`}>
                <RadioGroupItem value="cash" id="cash" />
                <div className="flex-1">
                  <p className="font-bold">الدفع عند الاستلام</p>
                  <p className="text-xs text-muted-foreground">ادفع نقداً عند باب منزلك</p>
                </div>
              </Label>
              <Label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer opacity-50 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'bg-card'}`}>
                <RadioGroupItem value="card" id="card" disabled />
                <div className="flex-1">
                  <p className="font-bold">بطاقة ائتمان (قريباً)</p>
                  <p className="text-xs text-muted-foreground">فيزا وماستر كارد</p>
                </div>
              </Label>
            </RadioGroup>
          </section>
        </div>

        {/* Order Summary */}
        <div className="bg-card border rounded-3xl p-8 h-fit space-y-6">
          <h2 className="font-headline text-2xl font-bold">ملخص الطلب</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} (x{item.quantity})</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-xl font-black">
              <span>الإجمالي</span>
              <span className="text-primary">${totalPrice}</span>
            </div>
          </div>
          <Button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-xl"
          >
            {loading ? 'جاري التنفيذ...' : 'تأكيد الطلب النهائي'}
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="w-3 h-3" />
            <span>سيتم إضافة نقاط لولاء المستخدم</span>
          </div>
        </div>
      </div>
    </div>
  );
}
