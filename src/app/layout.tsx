import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'TechVault Mobiles | Elite Smartphone Store',
  description: 'Experience the future of mobile technology with TechVault.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t py-12 px-4 md:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h2 className="font-headline text-2xl font-bold gradient-text">TechVault</h2>
              <p className="text-muted-foreground text-sm">
                Empowering your digital life with the world's most advanced mobile technology.
              </p>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>iPhone</li>
                <li>Samsung Galaxy</li>
                <li>Google Pixel</li>
                <li>OnePlus</li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Order Tracking</li>
                <li>Return Policy</li>
                <li>Warranty Information</li>
                <li>Technical Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest tech news and exclusive offers.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-background border rounded px-3 py-1 text-sm flex-1" />
                <button className="bg-primary text-primary-foreground px-4 py-1 rounded text-sm">Join</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
            © 2024 TechVault Mobiles. All rights reserved.
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
