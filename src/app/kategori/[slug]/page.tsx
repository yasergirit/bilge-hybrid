import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { categories, getCategoryBySlug, getGroupedSubcategories } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    openGraph: { title: category.name, description: category.description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);
  const groups = getGroupedSubcategories(category.subcategories);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: category.name }]} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-neutral-950">{category.name}</h1>
        <p className="mt-2 text-neutral-600 text-sm max-w-3xl leading-relaxed">{category.description}</p>
      </div>

      {/* Grouped subcategories */}
      {category.subcategories.length > 0 && (
        <div className="mt-8 space-y-6">
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.name && (
                <h2 className="text-sm font-semibold text-neutral-950 mb-3 uppercase tracking-wide">{group.name}</h2>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                {group.items.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/kategori/${category.slug}/${sub.slug}`}
                    className="border border-neutral-200 rounded-lg px-4 py-3 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                  >
                    <h3 className="text-sm font-medium text-neutral-800">{sub.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {category.subcategories.length === 0 && (
        <div className="mt-8 text-center py-12 border border-dashed border-neutral-200 rounded-lg">
          <p className="text-neutral-400 text-sm">Alt kategoriler yakında eklenecektir.</p>
        </div>
      )}

      {/* Products */}
      {products.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-950">Ürünler</h2>
            <select className="text-sm border border-neutral-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-950">
              <option>Önerilen Sıralama</option>
              <option>Fiyat: Düşükten Yükseğe</option>
              <option>Fiyat: Yüksekten Düşüğe</option>
              <option>En Yeniler</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
