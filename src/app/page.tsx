import Link from 'next/link';
import { categories } from '@/lib/data/categories';
import { getFeaturedProducts, getOwnBrandProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/product/product-card';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const ownBrandProducts = getOwnBrandProducts();

  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Müzik, Oyun ve Yaşam İçin
              <br />
              Güvenilir Alışveriş
            </h1>
            <p className="mt-4 text-neutral-400 text-lg leading-relaxed">
              Kendi üretimimiz enstrüman telleri ve kılıflarından, özenle seçilmiş yaşam ürünlerine. Kalite ve güven bir arada.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/kategori/muzik-aletleri"
                className="inline-flex items-center h-12 px-6 bg-white text-neutral-950 font-medium rounded-lg hover:bg-neutral-100 transition-colors"
              >
                Ürünleri Keşfet
              </Link>
              <Link
                href="/hakkimizda"
                className="inline-flex items-center h-12 px-6 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Markamızı Tanıyın
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: '500 TL Üzeri Ücretsiz Kargo', icon: 'M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
              { label: '14 Gün İade Hakkı', icon: 'M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' },
              { label: 'Güvenli Ödeme', icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z' },
              { label: 'Müşteri Desteği', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-2 py-2">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <span className="text-xs sm:text-sm text-neutral-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-neutral-950 mb-8">Kategoriler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategori/${cat.slug}`}
              className="group relative aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden flex items-end hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 to-transparent" />
              <div className="relative p-4">
                <h3 className="text-white font-semibold text-sm leading-tight">{cat.name}</h3>
                <p className="text-white/70 text-xs mt-1">{cat.subcategories.length} alt kategori</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Own Brand Section */}
      <section className="bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-8">
            <p className="text-sm font-medium text-neutral-500 mb-1">Bilge Hybrid Üretimi</p>
            <h2 className="text-2xl font-bold text-neutral-950">Kendi Markamız</h2>
            <p className="mt-2 text-neutral-600 text-sm max-w-lg">
              Yerel üretim enstrüman kılıfları ve özel markalı tellerimiz ile müzisyenlere kaliteyi uygun fiyatla sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {ownBrandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-neutral-950 mb-8">Öne Çıkan Ürünler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* QR/Brand Story Teaser */}
      <section className="bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">QR ile Orijinallik Doğrulama</h2>
              <p className="text-neutral-400 leading-relaxed">
                Bilge Hybrid ürünlerinizdeki QR kodunu tarayarak ürün bilgilerine, bakım önerilerine ve garanti detaylarına ulaşabilirsiniz.
              </p>
              <div className="mt-6 space-y-2">
                {['Ürün orijinallik doğrulama', 'Bakım ve kullanım kılavuzu', 'Garanti ve destek kaydı'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {text}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl font-bold text-neutral-950 mb-8">Sık Sorulan Sorular</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { q: 'Bilge Hybrid ürünleri orijinal mi?', a: 'Evet. Kendi markamız altında ürettiğimiz tüm ürünler, QR kod ile orijinallik doğrulaması yapılabilir.' },
            { q: 'Kargo ne kadar sürede ulaşır?', a: 'Siparişleriniz 1-5 iş günü içinde kargoya verilir.' },
            { q: 'İade yapabilir miyim?', a: 'Evet, teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz.' },
            { q: 'Kapıda ödeme var mı?', a: 'Evet, kapıda ödeme dahil birden fazla ödeme seçeneği sunuyoruz.' },
          ].map((faq, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-medium text-sm text-neutral-950">{faq.q}</h3>
              <p className="mt-1.5 text-sm text-neutral-500">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/sss" className="text-sm text-neutral-600 hover:text-neutral-950 underline underline-offset-4 transition-colors">
            Tüm soruları görüntüle
          </Link>
        </div>
      </section>
    </>
  );
}
