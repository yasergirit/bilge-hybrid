import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Adreslerim' };

export default function AddressesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Hesabım', href: '/hesabim' }, { label: 'Adreslerim' }]} />
      <div className="flex items-center justify-between mt-6 mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Adreslerim</h1>
        <Button size="sm">Yeni Adres Ekle</Button>
      </div>

      <div className="text-center py-12">
        <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <p className="text-neutral-500">Henüz kayıtlı adresiniz bulunmamaktadır.</p>
      </div>
    </div>
  );
}
