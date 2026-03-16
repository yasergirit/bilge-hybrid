import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { products } from '@/lib/data/products';
import { Button } from '@/components/ui/button';
import { OwnBrandBadge } from '@/components/brand/own-brand-badge';

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const product = products.find((p) => p.qrCode === code);
  if (!product) return { title: 'QR Doğrulama' };
  return {
    title: `${product.name} - QR Doğrulama`,
    description: `${product.name} ürün bilgileri ve orijinallik doğrulama.`,
  };
}

export default async function QRPage({ params }: Props) {
  const { code } = await params;
  const product = products.find((p) => p.qrCode === code);

  if (!product) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">QR Kod Bulunamadı</h1>
        <p className="text-neutral-500 mb-6">Bu QR kodu ile eşleşen bir ürün bulunamadı.</p>
        <Link href="/"><Button>Ana Sayfaya Dön</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      {/* Authenticity badge */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950">Orijinal Ürün</h1>
        <p className="text-neutral-500 text-sm mt-1">Bu ürün Bilge Hybrid tarafından doğrulanmıştır.</p>
      </div>

      {/* Product info */}
      <div className="border border-neutral-200 rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-neutral-950">{product.name}</h2>
        <p className="text-sm text-neutral-600">{product.description}</p>

        {product.ownBrandInfo && <OwnBrandBadge info={product.ownBrandInfo} />}

        {/* Attributes */}
        {product.attributes.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-950 mb-2">Ürün Özellikleri</h3>
            <dl className="space-y-1">
              {product.attributes.map((attr, i) => (
                <div key={i} className="flex text-sm">
                  <dt className="w-28 text-neutral-500 flex-shrink-0">{attr.name}</dt>
                  <dd className="text-neutral-800">{attr.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <p className="text-xs text-neutral-400">Ürün Kodu: {product.sku}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Link href={`/urun/${product.slug}`} className="block">
          <Button className="w-full" size="lg">Ürünü İncele</Button>
        </Link>
        <Link href="/iletisim" className="block">
          <Button variant="outline" className="w-full">Destek ve Garanti</Button>
        </Link>
      </div>

      {/* Brand footer */}
      <div className="mt-8 text-center">
        <p className="text-xl font-bold tracking-tight text-neutral-950">BILGE HYBRID</p>
        <p className="text-xs text-neutral-400 mt-1">Güvenilir Alışveriş, Kaliteli Ürünler</p>
      </div>
    </div>
  );
}
