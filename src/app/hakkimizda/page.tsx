import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Bilge Hybrid — müzik, oyun ve yaşam ürünlerinde güvenilir markanız.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-950 mb-6">Hakkımızda</h1>

      <div className="prose prose-neutral max-w-none text-sm leading-relaxed space-y-6">
        <p className="text-lg text-neutral-600">
          Bilge Hybrid, müzik aletleri ve aksesuarlarından oyun & oyuncak, anne & bebek, ev & yaşam ve teknoloji ürünlerine kadar geniş bir yelpazede hizmet veren bir e-ticaret markasıdır.
        </p>

        <h2 className="text-xl font-bold text-neutral-950 mt-8">Farkımız</h2>
        <p className="text-neutral-600">
          Bilge Hybrid sadece ürün satmaz. Kendi markamız altında ürettiğimiz enstrüman telleri, yerel ustalarımızla hazırladığımız özel tasarım enstrüman kılıfları ve QR kodlu özgün etiketlerimizle fark yaratıyoruz.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 my-8">
          {[
            { title: 'Özel Üretim', desc: 'Kendi markamız altında ürettiğimiz enstrüman telleri.' },
            { title: 'Yerel Üretim', desc: 'Türkiye\'de yerel ustalar tarafından üretilen kılıflar.' },
            { title: 'QR Doğrulama', desc: 'Ürün orijinalliğini QR kodla doğrulayabilirsiniz.' },
          ].map((item, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-950 text-sm">{item.title}</h3>
              <p className="text-xs text-neutral-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-neutral-950">Vizyonumuz</h2>
        <p className="text-neutral-600">
          Müşterilerimize kaliteli, güvenilir ve uygun fiyatlı ürünler sunmak; aynı zamanda yerel üretimi destekleyerek değer yaratmak en büyük amacımızdır.
        </p>

        <h2 className="text-xl font-bold text-neutral-950">İletişim</h2>
        <p className="text-neutral-600">
          Sorularınız ve önerileriniz için <Link href="/iletisim" className="text-neutral-950 font-medium underline underline-offset-4">iletişim sayfamızı</Link> ziyaret edebilirsiniz.
        </p>
      </div>
    </div>
  );
}
