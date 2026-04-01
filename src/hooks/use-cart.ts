'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  doc, 
  onSnapshot, 
  collection
} from 'firebase/firestore';
import { 
  useFirestore, 
  useUser, 
  useMemoFirebase,
  setDocumentNonBlocking,
  updateDocumentNonBlocking,
  deleteDocumentNonBlocking
} from '@/firebase';
import { type Product } from '@/lib/mock-data';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export function useCart() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Get cart reference
  const cartRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'cart');
  }, [firestore, user?.uid]);

  useEffect(() => {
    if (!cartRef) {
      setItems([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const cartData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as CartItem[];
      setItems(cartData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [cartRef]);

  const addToCart = (product: Product) => {
    if (!user || !firestore) return;

    const existingItem = items.find(item => item.productId === product.id);
    const itemRef = doc(firestore, 'users', user.uid, 'cart', product.id);

    if (existingItem) {
      updateDocumentNonBlocking(itemRef, {
        quantity: existingItem.quantity + 1
      });
    } else {
      setDocumentNonBlocking(itemRef, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }, {});
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    if (!user || !firestore) return;
    const item = items.find(i => i.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    const itemRef = doc(firestore, 'users', user.uid, 'cart', productId);

    if (newQuantity <= 0) {
      deleteDocumentNonBlocking(itemRef);
    } else {
      updateDocumentNonBlocking(itemRef, { quantity: newQuantity });
    }
  };

  const removeFromCart = (productId: string) => {
    if (!user || !firestore) return;
    const itemRef = doc(firestore, 'users', user.uid, 'cart', productId);
    deleteDocumentNonBlocking(itemRef);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [items]);

  return { items, loading, addToCart, updateQuantity, removeFromCart, totalPrice };
}
