import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    // تجاهل أخطاء الـ TypeScript أثناء البناء لضمان استكمال العملية
    ignoreBuildErrors: true,
  },
  eslint: {
    // تجاهل أخطاء الـ ESLint أثناء البناء
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
