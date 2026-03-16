import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sipariş Başarılı',
};

export default function OrderSuccessPage() {
  const orderNumber = `BH-${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-neutral-950 mb-2">Siparişiniz Alındı!</h1>
      <p className="text-neutral-600 mb-6">
        Siparişiniz başarıyla oluşturuldu. Sipariş takip bilgileri e-posta adresinize gönderilecektir.
      </p>

      <div className="bg-neutral-50 rounded-lg p-4 mb-8 text-sm">
        <p className="text-neutral-500">Sipariş Numarası</p>
        <p className="text-lg font-semibold text-neutral-950 mt-1">{orderNumber}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
        <Link href="/hesabim/siparislerim">
          <Button variant="outline">Siparişlerimi Görüntüle</Button>
        </Link>
      </div>
    </div>
  );
}
