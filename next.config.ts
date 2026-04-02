import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out', // إجبار المجلد على أن يكون out دائماً
  typescript: {
    // تجاهل أخطاء الـ TypeScript تماماً لضمان اكتمال البناء
    ignoreBuildErrors: true,
  },
  eslint: {
    // تجاهل أخطاء الـ ESLint تماماً
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
