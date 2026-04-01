
"use client"

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { useUser } from '@/firebase';

export function Navbar() {
  const { items } = useCart();
  const { user } = useUser();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full glass-morphism border-b px-4 md:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline text-2xl font-bold gradient-text tracking-tighter">TechVault</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-primary transition-colors">Smartphones</Link>
          <Link href="/products?category=flagship" className="hover:text-primary transition-colors">Flagships</Link>
          <Link href="/ai-helper" className="text-accent hover:opacity-80 transition-opacity flex items-center gap-1">
            <Cpu className="w-4 h-4" /> AI Finder
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
        <div className="hidden lg:flex relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search for models, brands..." 
            className="pl-10 bg-background/50 border-border focus:ring-primary h-9"
          />
        </div>

        <div className="flex items-center gap-1">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-primary text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-white/5">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass-morphism">
              <DropdownMenuLabel>
                {user ? `مرحباً، ${user.displayName || 'مستخدم'}` : 'حسابي'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
              <DropdownMenuItem>الطلبات</DropdownMenuItem>
              <DropdownMenuItem>المفضلة</DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuItem className="text-destructive">تسجيل الخروج</DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">تسجيل الدخول</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-white/5">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-morphism border-l">
              <div className="flex flex-col gap-6 mt-12">
                <Link href="/products" className="text-xl font-headline">Smartphones</Link>
                <Link href="/products?category=flagship" className="text-xl font-headline">Flagships</Link>
                <Link href="/ai-helper" className="text-xl font-headline text-accent">AI Finder</Link>
                <Link href="/cart" className="text-xl font-headline">Shopping Cart</Link>
                <Link href="/profile" className="text-xl font-headline">My Profile</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
