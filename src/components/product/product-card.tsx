import Link from 'next/link';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <Link href={`/urun/${product.slug}`} className="group block">
      <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden mb-3">
        {/* Placeholder image */}
        <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOwnBrand && <Badge variant="brand">Bilge Hybrid</Badge>}
          {hasDiscount && <Badge variant="sale">%{discountPercent}</Badge>}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>

      <div>
        <h3 className="text-sm font-medium text-neutral-800 line-clamp-2 group-hover:text-neutral-950 transition-colors leading-snug">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-base font-semibold text-neutral-950">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-neutral-400 line-through">{formatPrice(product.compareAtPrice!)}</span>
          )}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-1 text-xs text-amber-600">Son {product.stock} adet</p>
        )}
        {product.stock === 0 && (
          <p className="mt-1 text-xs text-red-600">Tükendi</p>
        )}
      </div>
    </Link>
  );
}
