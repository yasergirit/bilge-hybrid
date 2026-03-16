import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Müzik Aletleri & Aksesuarları',
    slug: 'muzik-aletleri',
    description: 'Gitar telleri, kılıflar, aksesuarlar ve daha fazlası. Bilge Hybrid kendi üretimi dahil.',
    image: '/images/categories/music.jpg',
    order: 1,
    subcategories: [
      { id: 'sub-1-1', categoryId: 'cat-1', name: 'Gitar Telleri', slug: 'gitar-telleri', description: 'Akustik ve elektro gitar telleri. Bilge Hybrid özel üretim seçenekleri.', order: 1 },
      { id: 'sub-1-2', categoryId: 'cat-1', name: 'Enstrüman Kılıfları', slug: 'enstruman-kiliflari', description: 'Yerel üretim, özel tasarım enstrüman kılıfları.', order: 2 },
      { id: 'sub-1-3', categoryId: 'cat-1', name: 'Ukulele Aksesuarları', slug: 'ukulele-aksesuarlari', description: 'Ukulele telleri, kılıfları ve aksesuarları.', order: 3 },
      { id: 'sub-1-4', categoryId: 'cat-1', name: 'Gitar Aksesuarları', slug: 'gitar-aksesuarlari', description: 'Penalar, kapolar, askılar ve diğer gitar aksesuarları.', order: 4 },
      { id: 'sub-1-5', categoryId: 'cat-1', name: 'Bakım & Temizlik', slug: 'bakim-temizlik', description: 'Enstrüman bakım ürünleri ve temizlik setleri.', order: 5 },
    ],
  },
  {
    id: 'cat-2',
    name: 'Oyun & Oyuncak',
    slug: 'oyun-oyuncak',
    description: 'Çocuklar ve yetişkinler için seçilmiş oyun ve oyuncak ürünleri.',
    image: '/images/categories/games.jpg',
    order: 2,
    subcategories: [
      { id: 'sub-2-1', categoryId: 'cat-2', name: 'Kutu Oyunları', slug: 'kutu-oyunlari', description: 'Aile ve arkadaş grubu kutu oyunları.', order: 1 },
      { id: 'sub-2-2', categoryId: 'cat-2', name: 'Eğitici Oyuncaklar', slug: 'egitici-oyuncaklar', description: 'Çocukların gelişimini destekleyen eğitici oyuncaklar.', order: 2 },
      { id: 'sub-2-3', categoryId: 'cat-2', name: 'Puzzle & Yapboz', slug: 'puzzle-yapboz', description: 'Her yaş için puzzle ve yapboz seçenekleri.', order: 3 },
    ],
  },
  {
    id: 'cat-3',
    name: 'Anne & Bebek',
    slug: 'anne-bebek',
    description: 'Anne ve bebek için güvenilir, kaliteli ürünler.',
    image: '/images/categories/baby.jpg',
    order: 3,
    subcategories: [
      { id: 'sub-3-1', categoryId: 'cat-3', name: 'Bebek Bakım', slug: 'bebek-bakim', description: 'Bebek bakım ürünleri ve aksesuarları.', order: 1 },
      { id: 'sub-3-2', categoryId: 'cat-3', name: 'Bebek Giyim', slug: 'bebek-giyim', description: 'Konforlu ve şık bebek giyim ürünleri.', order: 2 },
      { id: 'sub-3-3', categoryId: 'cat-3', name: 'Anne Ürünleri', slug: 'anne-urunleri', description: 'Anneler için seçilmiş özel ürünler.', order: 3 },
    ],
  },
  {
    id: 'cat-4',
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    description: 'Evinizi güzelleştiren pratik ve şık ürünler.',
    image: '/images/categories/home.jpg',
    order: 4,
    subcategories: [
      { id: 'sub-4-1', categoryId: 'cat-4', name: 'Mutfak Gereçleri', slug: 'mutfak-gerecleri', description: 'Pratik mutfak ürünleri ve gereçleri.', order: 1 },
      { id: 'sub-4-2', categoryId: 'cat-4', name: 'Dekorasyon', slug: 'dekorasyon', description: 'Ev dekorasyon ürünleri.', order: 2 },
      { id: 'sub-4-3', categoryId: 'cat-4', name: 'Organizasyon', slug: 'organizasyon', description: 'Düzenleme ve organizasyon çözümleri.', order: 3 },
    ],
  },
  {
    id: 'cat-5',
    name: 'Teknoloji',
    slug: 'teknoloji',
    description: 'Günlük hayatı kolaylaştıran teknoloji ürünleri ve aksesuarları.',
    image: '/images/categories/tech.jpg',
    order: 5,
    subcategories: [
      { id: 'sub-5-1', categoryId: 'cat-5', name: 'Telefon Aksesuarları', slug: 'telefon-aksesuarlari', description: 'Kılıflar, şarj aletleri ve telefon aksesuarları.', order: 1 },
      { id: 'sub-5-2', categoryId: 'cat-5', name: 'Kulaklık & Ses', slug: 'kulaklik-ses', description: 'Kulaklıklar, hoparlörler ve ses ekipmanları.', order: 2 },
      { id: 'sub-5-3', categoryId: 'cat-5', name: 'Kablolar & Adaptörler', slug: 'kablolar-adaptorler', description: 'Her türlü bağlantı kablosu ve adaptör.', order: 3 },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subSlug: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const subcategory = category.subcategories.find((s) => s.slug === subSlug);
  return subcategory ? { category, subcategory } : undefined;
}
