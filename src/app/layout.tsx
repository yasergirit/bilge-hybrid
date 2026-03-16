import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SiteGate } from '@/components/layout/site-gate';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Bilge Hybrid - Müzik, Oyun, Teknoloji & Yaşam',
    template: '%s | Bilge Hybrid',
  },
  description: 'Bilge Hybrid — müzik aletleri, aksesuarlar, oyun & oyuncak, anne & bebek, ev & yaşam ve teknoloji ürünlerinde güvenilir alışveriş.',
  keywords: ['bilge hybrid', 'gitar teli', 'enstrüman kılıfı', 'müzik aksesuarları', 'online alışveriş'],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Bilge Hybrid',
    title: 'Bilge Hybrid - Müzik, Oyun, Teknoloji & Yaşam',
    description: 'Müzik aletleri, aksesuarlar ve daha fazlası. Bilge Hybrid özel üretim ürünleri keşfedin.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SiteGate>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SiteGate>
      </body>
    </html>
  );
}
