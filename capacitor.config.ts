
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.techvault.store',
  appName: 'TechVault Mobiles',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    // ملاحظة: عند تشغيل التطبيق الحقيقي، يفضل وضع رابط الـ Hosting الخاص بـ Firebase هنا
    // url: "https://your-firebase-app.web.app" 
  }
};

export default config;
