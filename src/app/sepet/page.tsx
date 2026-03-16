'use client';

import Link from 'next/link';
import { useCart } from '@/lib/commerce/cart-store';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  const { items, subtotal, shippingEstimate, discount, total, couponCode, removeItem, updateQuantity, setCoupon } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">Sepetiniz Boş</h1>
        <p className="text-neutral-500 mb-6">Alışverişe başlamak için ürünleri keşfedin.</p>
        <Link href="/">
          <Button>Alışverişe Başla</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-neutral-950 mb-6">Sepetim ({items.length} ürün)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 p-4 border border-neutral-200 rounded-lg">
              {/* Image placeholder */}
              <div className="w-20 h-20 bg-neutral-100 rounded-md flex-shrink-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/urun/${item.slug}`} className="text-sm font-medium text-neutral-800 hover:text-neutral-950 line-clamp-2">
                  {item.name}
                </Link>
                {item.variant && (
                  <p className="text-xs text-neutral-500 mt-0.5">{item.variant}</p>
                )}
                <p className="text-sm font-semibold text-neutral-950 mt-1">{formatPrice(item.price)}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-neutral-300 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                      aria-label="Azalt"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                      aria-label="Artır"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-xs text-neutral-400 hover:text-red-600 transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="border border-neutral-200 rounded-lg p-6 sticky top-28">
            <h2 className="text-lg font-semibold text-neutral-950 mb-4">Sipariş Özeti</h2>

            {/* Coupon */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Kupon kodu"
                className="flex-1 h-10 px-3 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-950"
              />
              <Button variant="outline" size="sm">Uygula</Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Ara Toplam</span>
                <span className="text-neutral-950">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Kargo</span>
                <span className="text-neutral-950">
                  {shippingEstimate === 0 ? 'Ücretsiz' : formatPrice(shippingEstimate)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>İndirim</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <hr className="my-2 border-neutral-200" />
              <div className="flex justify-between text-base font-semibold">
                <span>Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            {subtotal < 500 && (
              <p className="mt-3 text-xs text-neutral-500">
                {formatPrice(500 - subtotal)} daha ekleyin, ücretsiz kargo kazanın!
              </p>
            )}

            <Link href="/odeme" className="block mt-4">
              <Button className="w-full" size="lg">Ödemeye Geç</Button>
            </Link>

            <Link href="/" className="block mt-2 text-center text-sm text-neutral-500 hover:text-neutral-950 transition-colors">
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
