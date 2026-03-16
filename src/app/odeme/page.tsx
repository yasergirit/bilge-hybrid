'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/commerce/cart-store';
import { getActivePaymentProviders } from '@/lib/commerce/payment';
import { formatPrice } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingEstimate, discount, total, clearCart } = useCart();
  const paymentProviders = getActivePaymentProviders();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(paymentProviders[0]?.id || '');
  const [processing, setProcessing] = useState(false);
  const [agreements, setAgreements] = useState({ sales: false, info: false });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">Sepetiniz boş</h1>
        <p className="text-neutral-500 mb-6">Ödeme yapabilmek için sepetinize ürün ekleyin.</p>
        <Link href="/"><Button>Alışverişe Başla</Button></Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!agreements.sales || !agreements.info) return;
    setProcessing(true);
    // Simulate payment
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/odeme/basarili');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-neutral-950 mb-6">Ödeme</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        {['Bilgiler', 'Ödeme', 'Onay'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
              step > i + 1 ? 'bg-neutral-950 text-white' :
              step === i + 1 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-500'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={step === i + 1 ? 'text-neutral-950 font-medium' : 'text-neutral-500'}>{label}</span>
            {i < 2 && <div className="w-8 h-px bg-neutral-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Customer info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">İletişim Bilgileri</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input id="firstName" label="Ad" placeholder="Adınız" required />
                  <Input id="lastName" label="Soyad" placeholder="Soyadınız" required />
                  <Input id="email" label="E-posta" type="email" placeholder="ornek@email.com" required />
                  <Input id="phone" label="Telefon" type="tel" placeholder="05XX XXX XX XX" required />
                </div>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Teslimat Adresi</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Input id="addressTitle" label="Adres Başlığı" placeholder="Ev, İş vb." />
                  </div>
                  <Input id="city" label="İl" placeholder="İl seçin" required />
                  <Input id="district" label="İlçe" placeholder="İlçe seçin" required />
                  <Input id="neighborhood" label="Mahalle" placeholder="Mahalle" />
                  <Input id="postalCode" label="Posta Kodu" placeholder="34000" />
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1.5">Adres</label>
                    <textarea
                      id="address"
                      rows={3}
                      placeholder="Açık adresinizi yazın"
                      className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => setStep(2)} size="lg" className="w-full sm:w-auto">
                Ödeme Adımına Geç
              </Button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Kargo Seçimi</h2>
                <label className="flex items-center gap-3 p-3 border border-neutral-950 rounded-lg cursor-pointer">
                  <input type="radio" name="shipping" defaultChecked className="accent-neutral-950" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Standart Kargo</p>
                    <p className="text-xs text-neutral-500">2-5 iş günü</p>
                  </div>
                  <span className="text-sm font-medium">
                    {shippingEstimate === 0 ? 'Ücretsiz' : formatPrice(shippingEstimate)}
                  </span>
                </label>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Ödeme Yöntemi</h2>
                <div className="space-y-3">
                  {paymentProviders.map((provider) => (
                    <label
                      key={provider.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === provider.id ? 'border-neutral-950' : 'border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={provider.id}
                        checked={paymentMethod === provider.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-neutral-950"
                      />
                      <span className="text-sm font-medium">{provider.name}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'credit-card' && (
                  <div className="mt-4 grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Input id="cardNumber" label="Kart Numarası" placeholder="XXXX XXXX XXXX XXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <Input id="cardHolder" label="Kart Üzerindeki İsim" placeholder="AD SOYAD" />
                    </div>
                    <Input id="expiry" label="Son Kullanma" placeholder="AA/YY" />
                    <Input id="cvv" label="CVV" placeholder="XXX" />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>Geri</Button>
                <Button onClick={() => setStep(3)} size="lg">Siparişi Onayla</Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border border-neutral-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Sipariş Onayı</h2>
                <p className="text-sm text-neutral-600 mb-4">
                  Siparişinizi tamamlamak için aşağıdaki sözleşmeleri onaylayın.
                </p>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreements.info}
                      onChange={(e) => setAgreements({ ...agreements, info: e.target.checked })}
                      className="mt-0.5 accent-neutral-950"
                    />
                    <span className="text-sm text-neutral-600">
                      <Link href="/sayfa/on-bilgilendirme-formu" target="_blank" className="underline hover:text-neutral-950">
                        Ön Bilgilendirme Formu
                      </Link>
                      &apos;nu okudum ve onaylıyorum.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreements.sales}
                      onChange={(e) => setAgreements({ ...agreements, sales: e.target.checked })}
                      className="mt-0.5 accent-neutral-950"
                    />
                    <span className="text-sm text-neutral-600">
                      <Link href="/sayfa/mesafeli-satis-sozlesmesi" target="_blank" className="underline hover:text-neutral-950">
                        Mesafeli Satış Sözleşmesi
                      </Link>
                      &apos;ni okudum ve onaylıyorum.
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>Geri</Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={!agreements.sales || !agreements.info || processing}
                >
                  {processing ? 'İşleniyor...' : `Siparişi Tamamla — ${formatPrice(total)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="border border-neutral-200 rounded-lg p-6 sticky top-28">
            <h2 className="text-lg font-semibold text-neutral-950 mb-4">Sipariş Özeti</h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="text-neutral-700 truncate">{item.name}</p>
                    <p className="text-xs text-neutral-400">x{item.quantity}</p>
                  </div>
                  <span className="text-neutral-950 font-medium ml-2">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <hr className="border-neutral-200 mb-3" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Ara Toplam</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Kargo</span>
                <span>{shippingEstimate === 0 ? 'Ücretsiz' : formatPrice(shippingEstimate)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>İndirim</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <hr className="border-neutral-200" />
              <div className="flex justify-between font-semibold text-base">
                <span>Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
