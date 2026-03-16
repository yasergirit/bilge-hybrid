import type { Metadata } from 'next';
import { searchProducts } from '@/lib/data/products';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `"${q}" araması` : 'Arama' };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchProducts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Arama' }]} />

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-neutral-950">
          {query ? `"${query}" için sonuçlar` : 'Arama'}
        </h1>
        {query && (
          <p className="mt-1 text-sm text-neutral-500">{results.length} sonuç bulundu</p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="mt-12 text-center py-12">
          <p className="text-neutral-500 mb-2">Aramanızla eşleşen ürün bulunamadı.</p>
          <p className="text-sm text-neutral-400">Farklı anahtar kelimeler deneyin veya kategorileri inceleyin.</p>
        </div>
      ) : (
        <div className="mt-12 text-center py-12">
          <p className="text-neutral-500">Aramak istediğiniz ürünü yukarıdaki arama çubuğuna yazın.</p>
        </div>
      )}
    </div>
  );
}
