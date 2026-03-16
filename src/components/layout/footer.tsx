import Link from 'next/link';
import { categories } from '@/lib/data/categories';

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">BILGE HYBRID</Link>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
              Müzik, oyun, teknoloji ve yaşam ürünlerinde güvenilir alışveriş deneyimi.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Kategoriler</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/kategori/${cat.slug}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Müşteri Hizmetleri</h3>
            <ul className="space-y-2">
              <li><Link href="/iletisim" className="text-sm text-neutral-400 hover:text-white transition-colors">İletişim</Link></li>
              <li><Link href="/sss" className="text-sm text-neutral-400 hover:text-white transition-colors">Sık Sorulan Sorular</Link></li>
              <li><Link href="/sayfa/iade-degisim-politikasi" className="text-sm text-neutral-400 hover:text-white transition-colors">İade & Değişim</Link></li>
              <li><Link href="/sayfa/teslimat-kargo-politikasi" className="text-sm text-neutral-400 hover:text-white transition-colors">Teslimat & Kargo</Link></li>
              <li><Link href="/hakkimizda" className="text-sm text-neutral-400 hover:text-white transition-colors">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Yasal</h3>
            <ul className="space-y-2">
              <li><Link href="/sayfa/kvkk-aydinlatma-metni" className="text-sm text-neutral-400 hover:text-white transition-colors">KVKK Aydınlatma Metni</Link></li>
              <li><Link href="/sayfa/gizlilik-politikasi" className="text-sm text-neutral-400 hover:text-white transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/sayfa/cerez-politikasi" className="text-sm text-neutral-400 hover:text-white transition-colors">Çerez Politikası</Link></li>
              <li><Link href="/sayfa/mesafeli-satis-sozlesmesi" className="text-sm text-neutral-400 hover:text-white transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link href="/sayfa/on-bilgilendirme-formu" className="text-sm text-neutral-400 hover:text-white transition-colors">Ön Bilgilendirme Formu</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Bilge Hybrid. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <span>Güvenli Ödeme</span>
            <span>•</span>
            <span>Hızlı Teslimat</span>
            <span>•</span>
            <span>Kolay İade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
