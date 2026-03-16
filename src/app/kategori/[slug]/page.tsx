import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { categories, getCategoryBySlug } from '@/lib/data/categories';
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: category.name }]} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-neutral-950">{category.name}</h1>
        <p className="mt-2 text-neutral-600 text-sm max-w-2xl">{category.description}</p>
      </div>

      {/* Subcategories */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {category.subcategories.map((sub) => (
          <Link
            key={sub.id}
            href={`/kategori/${category.slug}/${sub.slug}`}
            className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-400 transition-colors text-center"
          >
            <h3 className="text-sm font-medium text-neutral-800">{sub.name}</h3>
            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{sub.description}</p>
          </Link>
        ))}
      </div>

      {/* Products */}
      {products.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-neutral-500">{products.length} ürün</p>
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

      {products.length === 0 && (
        <div className="mt-10 text-center py-16">
          <p className="text-neutral-500">Bu kategoride henüz ürün bulunmamaktadır.</p>
        </div>
      )}
    </div>
  );
}
