/**
 * @fileOverview بيانات المنتجات بدون صور لضمان خفة التطبيق وتجنب أخطاء البناء.
 */

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
  image: string; // ستبقى فارغة
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
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip.',
    rating: 4.9,
    reviewsCount: 1240,
    image: '',
    category: 'flagship',
    specs: {
      ram: '8GB',
      storage: '256GB',
      camera: '48MP Main',
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
    description: 'The ultimate form of Galaxy Ultra with Galaxy AI.',
    rating: 4.8,
    reviewsCount: 890,
    image: '',
    category: 'flagship',
    specs: {
      ram: '12GB',
      storage: '512GB',
      camera: '200MP Main',
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
    description: 'The all-pro phone engineered by Google.',
    rating: 4.7,
    reviewsCount: 560,
    image: '',
    category: 'flagship',
    specs: {
      ram: '12GB',
      storage: '128GB',
      camera: '50MP Main',
      battery: '5050mAh',
      processor: 'Google Tensor G3',
      screen: '6.7" Super Actua Display'
    }
  }
];

export const CATEGORIES = ['All', 'Flagship', 'Mid-range', 'Budget'];
export const BRANDS = ['Apple', 'Samsung', 'Google', 'Xiaomi', 'Nothing', 'OnePlus'];
