import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast';
import { APP_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${APP_CONFIG.shortName} — O‘zbekiston Maktab Yo‘l Xavfsizligi Platformasi`,
  description:
    'O‘zbekiston maktablari atrofidagi yo‘l harakati xavfsizligi holatini monitoring qilish, baholash va nazorat qilish milliy platformasi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
