import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { categories, getSubcategoryBySlug } from '@/lib/data/categories';
import { getProductsBySubcategory } from '@/lib/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Props {
  params: Promise<{ slug: string; subSlug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; subSlug: string }[] = [];
  categories.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      params.push({ slug: cat.slug, subSlug: sub.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const result = getSubcategoryBySlug(slug, subSlug);
  if (!result) return {};
  return {
    title: `${result.subcategory.name} - ${result.category.name}`,
    description: result.subcategory.description,
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { slug, subSlug } = await params;
  const result = getSubcategoryBySlug(slug, subSlug);
  if (!result) notFound();

  const { category, subcategory } = result;
  const products = getProductsBySubcategory(subcategory.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: category.name, href: `/kategori/${category.slug}` },
          { label: subcategory.name },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-neutral-950">{subcategory.name}</h1>
        <p className="mt-2 text-neutral-600 text-sm max-w-2xl">{subcategory.description}</p>
      </div>

      {products.length > 0 && (
        <div className="mt-8">
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
