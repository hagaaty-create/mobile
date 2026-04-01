export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  specs: {
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    processor: string;
    screen: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    oldPrice: 1299,
    discount: 8,
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
    rating: 4.9,
    reviewsCount: 1240,
    image: 'https://picsum.photos/seed/iphone15pm/800/800',
    category: 'flagship',
    specs: {
      ram: '8GB',
      storage: '256GB',
      camera: '48MP Main | 12MP Ultra Wide | 12MP Telephoto',
      battery: '4422mAh',
      processor: 'A17 Pro',
      screen: '6.7" Super Retina XDR'
    }
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    description: 'The ultimate form of Galaxy Ultra. Now with Galaxy AI, Titanium frame and an even more impressive 200MP camera system.',
    rating: 4.8,
    reviewsCount: 890,
    image: 'https://picsum.photos/seed/s24u/800/800',
    category: 'flagship',
    specs: {
      ram: '12GB',
      storage: '512GB',
      camera: '200MP Main | 50MP Periscope | 10MP Telephoto | 12MP Ultra Wide',
      battery: '5000mAh',
      processor: 'Snapdragon 8 Gen 3',
      screen: '6.8" Dynamic AMOLED 2X'
    }
  },
  {
    id: '3',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    oldPrice: 1099,
    discount: 10,
    description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and has a new temperature sensor.',
    rating: 4.7,
    reviewsCount: 560,
    image: 'https://picsum.photos/seed/pixel8p/800/800',
    category: 'flagship',
    specs: {
      ram: '12GB',
      storage: '128GB',
      camera: '50MP Main | 48MP Ultra Wide | 48MP Telephoto',
      battery: '5050mAh',
      processor: 'Google Tensor G3',
      screen: '6.7" Super Actua Display'
    }
  },
  {
    id: '4',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    price: 599,
    description: 'A new way to interact. The Glyph Interface allows you to assign different light and sound sequences for each contact and notification type.',
    rating: 4.5,
    reviewsCount: 320,
    image: 'https://picsum.photos/seed/nothing2/800/800',
    category: 'mid-range',
    specs: {
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Main | 50MP Ultra Wide',
      battery: '4700mAh',
      processor: 'Snapdragon 8+ Gen 1',
      screen: '6.7" LTPO OLED'
    }
  }
];

export const CATEGORIES = ['All', 'Flagship', 'Mid-range', 'Budget'];
export const BRANDS = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Nothing', 'OnePlus'];
