import type { Category } from '@/lib/types';

export const categories: Category[] = [
  // ─── 1. ENSTRÜMAN KILIFLARI ─────────────────────────────────
  {
    id: 'cat-1',
    name: 'Enstrüman Kılıfları',
    slug: 'enstruman-kiliflari',
    description: 'Tüm kılıflarımız; dayanıklı dikiş yapısı, koruma sağlayan iç pedleme, suya dayanıklı dış yüzey ve ergonomik taşıma askılarıyla üretilir. Farklı enstrüman türlerine özel ölçülendirme yapılarak hem amatör, hem de profesyonel kullanıcılar için uzun ömürlü kullanım sunar.',
    image: '/images/categories/cases.jpg',
    order: 1,
    subcategories: [
      {
        id: 'sub-1-1', categoryId: 'cat-1', name: 'Gitar Kılıfları', slug: 'gitar-kiliflari',
        description: 'Klasik, akustik ve elektro gitar kılıfları.', order: 1,
        children: [
          { id: 'sub-1-1-1', name: 'Klasik Gitar Kılıfları 4/4', slug: 'klasik-gitar-kiliflari-4-4', description: 'Full-size klasik gitar kılıfları.' },
          { id: 'sub-1-1-2', name: 'Klasik Gitar Kılıfları 3/4', slug: 'klasik-gitar-kiliflari-3-4', description: '3/4 boyut klasik gitar kılıfları.' },
          { id: 'sub-1-1-3', name: 'Akustik Gitar Kılıfları 4/4', slug: 'akustik-gitar-kiliflari-4-4', description: 'Full-size akustik gitar kılıfları.' },
          { id: 'sub-1-1-4', name: 'Elektro Gitar Kılıfı 4/4', slug: 'elektro-gitar-kilifi-4-4', description: 'Elektro gitar kılıfları.' },
        ],
      },
      {
        id: 'sub-1-2', categoryId: 'cat-1', name: 'Ukulele Kılıfları', slug: 'ukulele-kiliflari',
        description: 'Soprano ve concert ukulele kılıfları.', order: 2,
        children: [
          { id: 'sub-1-2-1', name: 'Soprano Ukulele Kılıfları', slug: 'soprano-ukulele-kiliflari', description: 'Soprano ukulele için özel kılıflar.' },
          { id: 'sub-1-2-2', name: 'Concert Ukulele Kılıfları', slug: 'concert-ukulele-kiliflari', description: 'Concert ukulele için özel kılıflar.' },
        ],
      },
      {
        id: 'sub-1-3', categoryId: 'cat-1', name: 'Bağlama Kılıfları', slug: 'baglama-kiliflari',
        description: 'Kısa sap ve uzun sap bağlama kılıfları.', order: 3,
        children: [
          { id: 'sub-1-3-1', name: 'Kısa Sap Bağlama Kılıfları', slug: 'kisa-sap-baglama-kiliflari', description: 'Kısa sap bağlama kılıfları.' },
          { id: 'sub-1-3-2', name: 'Uzun Sap Bağlama Kılıfları', slug: 'uzun-sap-baglama-kiliflari', description: 'Uzun sap bağlama kılıfları.' },
        ],
      },
      { id: 'sub-1-4', categoryId: 'cat-1', name: 'Kalimba Kılıfları', slug: 'kalimba-kiliflari', description: 'Kalimba kılıfları.', order: 4 },
      { id: 'sub-1-5', categoryId: 'cat-1', name: 'Kemençe Kılıfları', slug: 'kemence-kiliflari', description: 'Kemençe kılıfları.', order: 5 },
      { id: 'sub-1-6', categoryId: 'cat-1', name: 'Cajon Kılıfları', slug: 'cajon-kiliflari', description: 'Cajon kılıfları.', order: 6 },
    ],
  },

  // ─── 2. MÜZİK ALETLERİ ──────────────────────────────────────
  {
    id: 'cat-2',
    name: 'Müzik Aletleri',
    slug: 'muzik-aletleri',
    description: 'Gitar, bağlama, ud, yaylılar, tuşlular, nefesliler, perküsyon ve daha fazlası. Her seviye için müzik aletleri.',
    image: '/images/categories/instruments.jpg',
    order: 2,
    subcategories: [
      // Gitar
      { id: 'sub-2-1', categoryId: 'cat-2', name: 'Klasik Gitar', slug: 'klasik-gitar', description: 'Klasik gitarlar — 3/4, 4/4 ve elektro klasik modelleri.', group: 'Gitar', order: 1 },
      { id: 'sub-2-2', categoryId: 'cat-2', name: 'Akustik Gitar', slug: 'akustik-gitar', description: 'Akustik ve elektro akustik gitarlar.', group: 'Gitar', order: 2 },
      { id: 'sub-2-3', categoryId: 'cat-2', name: 'Elektro Gitar', slug: 'elektro-gitar', description: 'Elektro gitarlar.', group: 'Gitar', order: 3 },
      { id: 'sub-2-4', categoryId: 'cat-2', name: 'Bas Gitar', slug: 'bas-gitar', description: 'Bas gitarlar.', group: 'Gitar', order: 4 },
      { id: 'sub-2-5', categoryId: 'cat-2', name: 'Ukulele', slug: 'ukulele', description: 'Soprano, concert ve tenor ukuleleler.', group: 'Gitar', order: 5 },
      // Bağlama
      { id: 'sub-2-6', categoryId: 'cat-2', name: 'Kısa Sap Bağlama', slug: 'kisa-sap-baglama', description: 'Kısa sap bağlamalar.', group: 'Bağlama', order: 6 },
      { id: 'sub-2-7', categoryId: 'cat-2', name: 'Uzun Sap Bağlama', slug: 'uzun-sap-baglama', description: 'Uzun sap bağlamalar.', group: 'Bağlama', order: 7 },
      // Ud
      { id: 'sub-2-8', categoryId: 'cat-2', name: 'Ud', slug: 'ud', description: 'Udlar.', order: 8 },
      // Yaylılar
      { id: 'sub-2-9', categoryId: 'cat-2', name: 'Keman', slug: 'keman', description: 'Kemanlar — 3/4 ve 4/4 boyutlar.', group: 'Yaylılar', order: 9 },
      { id: 'sub-2-10', categoryId: 'cat-2', name: 'Çello', slug: 'cello', description: 'Çellolar — 3/4 ve 4/4 boyutlar.', group: 'Yaylılar', order: 10 },
      { id: 'sub-2-11', categoryId: 'cat-2', name: 'Viyola', slug: 'viyola', description: 'Viyolalar — 14", 15", 16" boyutlar.', group: 'Yaylılar', order: 11 },
      // Tuşlular
      { id: 'sub-2-12', categoryId: 'cat-2', name: 'Piyanolar', slug: 'piyanolar', description: 'Dijital ve akustik piyanolar.', group: 'Tuşlular', order: 12 },
      { id: 'sub-2-13', categoryId: 'cat-2', name: 'Midi Klavyeler', slug: 'midi-klavyeler', description: 'MIDI klavyeler ve controller\'lar.', group: 'Tuşlular', order: 13 },
      { id: 'sub-2-14', categoryId: 'cat-2', name: 'Orglar', slug: 'orglar', description: 'Orglar.', group: 'Tuşlular', order: 14 },
      // Nefesliler
      { id: 'sub-2-15', categoryId: 'cat-2', name: 'Pikolo', slug: 'pikolo', description: 'Pikololar.', group: 'Nefesliler', order: 15 },
      { id: 'sub-2-16', categoryId: 'cat-2', name: 'Yan Flüt', slug: 'yan-flut', description: 'Yan flütler.', group: 'Nefesliler', order: 16 },
      { id: 'sub-2-17', categoryId: 'cat-2', name: 'Klarnet', slug: 'klarnet', description: 'Klarnetler.', group: 'Nefesliler', order: 17 },
      { id: 'sub-2-18', categoryId: 'cat-2', name: 'Saksafon', slug: 'saksafon', description: 'Saksafonlar.', group: 'Nefesliler', order: 18 },
      { id: 'sub-2-19', categoryId: 'cat-2', name: 'Diğer Nefesliler', slug: 'diger-nefesliler', description: 'Diğer nefesli çalgılar.', group: 'Nefesliler', order: 19 },
      // Davul & Perküsyon
      { id: 'sub-2-20', categoryId: 'cat-2', name: 'Davul & Perküsyon', slug: 'davul-perkusyon', description: 'Davul setleri, cajon ve perküsyon aletleri.', order: 20 },
      // Amfiler
      { id: 'sub-2-21', categoryId: 'cat-2', name: 'Amfiler', slug: 'amfiler', description: 'Gitar, bas ve çok amaçlı amfiler.', order: 21 },
      // Aksesuarlar
      { id: 'sub-2-22', categoryId: 'cat-2', name: 'Enstrüman Telleri', slug: 'enstruman-telleri', description: 'Gitar, bağlama, keman, ukulele ve diğer teller.', group: 'Aksesuarlar', order: 22 },
      { id: 'sub-2-23', categoryId: 'cat-2', name: 'Tuner', slug: 'tuner', description: 'Akort cihazları ve clip-on tuner\'lar.', group: 'Aksesuarlar', order: 23 },
      { id: 'sub-2-24', categoryId: 'cat-2', name: 'Metronom', slug: 'metronom', description: 'Mekanik ve dijital metronomlar.', group: 'Aksesuarlar', order: 24 },
      { id: 'sub-2-25', categoryId: 'cat-2', name: 'Kablolar', slug: 'kablolar', description: 'Enstrüman kabloları ve bağlantı ekipmanları.', group: 'Aksesuarlar', order: 25 },
      { id: 'sub-2-26', categoryId: 'cat-2', name: 'Diğer Aksesuarlar', slug: 'diger-aksesuarlar', description: 'Penalar, kapolar, askılar ve diğer müzik aksesuarları.', group: 'Aksesuarlar', order: 26 },
    ],
  },

  // ─── 3. OYUN & OYUNCAK ──────────────────────────────────────
  {
    id: 'cat-3',
    name: 'Oyun & Oyuncak',
    slug: 'oyun-oyuncak',
    description: 'Çocuklar ve yetişkinler için seçilmiş oyun ve oyuncak ürünleri.',
    image: '/images/categories/games.jpg',
    order: 3,
    subcategories: [
      { id: 'sub-3-1', categoryId: 'cat-3', name: 'Kutu Oyunları', slug: 'kutu-oyunlari', description: 'Aile ve arkadaş grubu kutu oyunları.', order: 1 },
      { id: 'sub-3-2', categoryId: 'cat-3', name: 'Eğitici Oyuncaklar', slug: 'egitici-oyuncaklar', description: 'Çocukların gelişimini destekleyen eğitici oyuncaklar.', order: 2 },
      { id: 'sub-3-3', categoryId: 'cat-3', name: 'Kız Çocuk Oyuncakları', slug: 'kiz-cocuk-oyuncaklari', description: 'Kız çocuklar için oyuncaklar.', order: 3 },
      { id: 'sub-3-4', categoryId: 'cat-3', name: 'Erkek Çocuk Oyuncakları', slug: 'erkek-cocuk-oyuncaklari', description: 'Erkek çocuklar için oyuncaklar.', order: 4 },
    ],
  },

  // ─── 4. ANNE & BEBEK ────────────────────────────────────────
  {
    id: 'cat-4',
    name: 'Anne & Bebek',
    slug: 'anne-bebek',
    description: 'Anne ve bebek için güvenilir, kaliteli ürünler.',
    image: '/images/categories/baby.jpg',
    order: 4,
    subcategories: [
      { id: 'sub-4-1', categoryId: 'cat-4', name: 'Bebek & Çocuk Giyim', slug: 'bebek-cocuk-giyim', description: 'Konforlu ve şık bebek & çocuk giyim ürünleri.', order: 1 },
      { id: 'sub-4-2', categoryId: 'cat-4', name: 'Banyo & Bakım', slug: 'banyo-bakim', description: 'Bebek banyo ve bakım ürünleri.', order: 2 },
      { id: 'sub-4-3', categoryId: 'cat-4', name: 'Taşıma & Güvenlik', slug: 'tasima-guvenlik', description: 'Bebek taşıma ve güvenlik ürünleri.', order: 3 },
    ],
  },

  // ─── 5. EV & YAŞAM ─────────────────────────────────────────
  {
    id: 'cat-5',
    name: 'Ev & Yaşam',
    slug: 'ev-yasam',
    description: 'Evinizi güzelleştiren pratik ve şık ürünler.',
    image: '/images/categories/home.jpg',
    order: 5,
    subcategories: [],
  },

  // ─── 6. TEKNOLOJİ ──────────────────────────────────────────
  {
    id: 'cat-6',
    name: 'Teknoloji',
    slug: 'teknoloji',
    description: 'Günlük hayatı kolaylaştıran teknoloji ürünleri ve aksesuarları.',
    image: '/images/categories/tech.jpg',
    order: 6,
    subcategories: [],
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

/** Group subcategories for display — preserves order */
export function getGroupedSubcategories(subcategories: typeof categories[0]['subcategories']) {
  const groups: { name: string | null; items: typeof subcategories }[] = [];
  let currentGroup: string | null | undefined = undefined;

  for (const sub of subcategories) {
    const g = sub.group ?? null;
    if (g !== currentGroup) {
      groups.push({ name: g, items: [] });
      currentGroup = g;
    }
    groups[groups.length - 1].items.push(sub);
  }

  return groups;
}
