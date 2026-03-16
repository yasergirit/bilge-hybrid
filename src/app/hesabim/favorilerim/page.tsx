import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = { title: 'Favorilerim' };

export default function FavoritesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Hesabım', href: '/hesabim' }, { label: 'Favorilerim' }]} />
      <h1 className="text-2xl font-bold text-neutral-950 mt-6 mb-8">Favorilerim</h1>

      <div className="text-center py-12">
        <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <p className="text-neutral-500">Henüz favorilere eklenen ürün bulunmamaktadır.</p>
      </div>
    </div>
  );
}
