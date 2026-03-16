import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = { title: 'Siparişlerim' };

export default function OrdersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Hesabım', href: '/hesabim' }, { label: 'Siparişlerim' }]} />
      <h1 className="text-2xl font-bold text-neutral-950 mt-6 mb-8">Siparişlerim</h1>

      <div className="text-center py-12">
        <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <p className="text-neutral-500">Henüz siparişiniz bulunmamaktadır.</p>
      </div>
    </div>
  );
}
