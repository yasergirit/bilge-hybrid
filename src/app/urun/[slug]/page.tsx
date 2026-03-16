import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products, getProductBySlug, getProductsBySubcategory } from '@/lib/data/products';
import { getCategoryBySlug, categories } from '@/lib/data/categories';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductDetail } from './product-detail';
import { ProductCard } from '@/components/product/product-card';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === product.subcategoryId);
  const relatedProducts = getProductsBySubcategory(product.subcategoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [];
  if (category) {
    breadcrumbItems.push({ label: category.name, href: `/kategori/${category.slug}` });
  }
  if (category && subcategory) {
    breadcrumbItems.push({ label: subcategory.name, href: `/kategori/${category.slug}/${subcategory.slug}` });
  }
  breadcrumbItems.push({ label: product.name });

  // Product structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'TRY',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />
        <ProductDetail product={product} />

        {relatedProducts.length > 0 && (
          <section className="mt-16 mb-8">
            <h2 className="text-xl font-bold text-neutral-950 mb-6">İlgili Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
