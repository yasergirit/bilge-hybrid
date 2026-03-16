import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular',
  description: 'Bilge Hybrid hakkında sık sorulan sorular ve cevapları.',
};

const faqs = [
  { q: 'Bilge Hybrid ürünleri orijinal mi?', a: 'Evet. Kendi markamız altında ürettiğimiz tüm ürünler, QR kod ile orijinallik doğrulaması yapılabilir. Satışa sunduğumuz tüm ürünler güvenilir tedarikçilerden temin edilmektedir.' },
  { q: 'Kargo ne kadar sürede ulaşır?', a: 'Siparişleriniz ödeme onayından itibaren 1-5 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz bölgeye göre değişiklik gösterebilir.' },
  { q: '500 TL üzeri ücretsiz kargo geçerli mi?', a: 'Evet, 500 TL ve üzeri tüm siparişlerde Türkiye genelinde ücretsiz kargo fırsatımız bulunmaktadır.' },
  { q: 'İade yapabilir miyim?', a: 'Evet, ürünleri teslim aldığınız tarihten itibaren 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak koşuluyla iade edebilirsiniz.' },
  { q: 'Kapıda ödeme var mı?', a: 'Evet, kapıda ödeme dahil olmak üzere kredi kartı, banka kartı, havale/EFT gibi birden fazla ödeme seçeneği sunuyoruz.' },
  { q: 'Bilge Hybrid kendi üretim ürünlerinin farkı nedir?', a: 'Bilge Hybrid markası altında ürettiğimiz gitar telleri, ukulele telleri ve enstrüman kılıfları, kaliteli malzemeler kullanılarak özel olarak üretilmektedir. Her ürün, QR kodlu etiket ile orijinallik doğrulaması sunar.' },
  { q: 'QR kodlu etiket nedir?', a: 'Bilge Hybrid ürünlerindeki QR kodlar, ürün bilgilerine, bakım önerilerine ve orijinallik doğrulamasına erişmenizi sağlar. Telefonunuzla QR kodu taramanız yeterlidir.' },
  { q: 'Toptan satış yapıyor musunuz?', a: 'Toptan satış talepleriniz için info@bilgehybrid.com adresinden bizimle iletişime geçebilirsiniz.' },
  { q: 'Fatura düzenliyor musunuz?', a: 'Evet, tüm siparişler için e-fatura düzenlenmektedir.' },
  { q: 'Sipariş takibi nasıl yapılır?', a: 'Siparişiniz kargoya verildikten sonra kargo takip numarası e-posta ile paylaşılır. Hesabım bölümünden de siparişlerinizi takip edebilirsiniz.' },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-950 mb-2">Sık Sorulan Sorular</h1>
      <p className="text-neutral-500 text-sm mb-8">Merak ettiğiniz konularda hızlı cevaplar.</p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-neutral-200 rounded-lg">
            <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-neutral-950 list-none">
              {faq.q}
              <svg className="w-4 h-4 text-neutral-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
