'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';
import { useCart } from '@/lib/commerce/cart-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OwnBrandBadge } from '@/components/brand/own-brand-badge';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id);
  const [added, setAdded] = useState(false);

  const currentVariant = product.variants?.find((v) => v.id === selectedVariant);
  const currentPrice = product.price + (currentVariant?.priceModifier ?? 0);
  const inStock = currentVariant ? currentVariant.stock > 0 : product.stock > 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant,
      quantity,
      price: currentPrice,
      name: product.name,
      image: product.images[0] || '',
      slug: product.slug,
      variant: currentVariant?.options.join(', '),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > currentPrice;

  return (
    <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image gallery */}
      <div className="space-y-3">
        <div className="aspect-square bg-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          <svg className="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
          {product.isOwnBrand && (
            <div className="absolute top-3 left-3">
              <Badge variant="brand">Bilge Hybrid</Badge>
            </div>
          )}
          {hasDiscount && (
            <div className="absolute top-3 right-3">
              <Badge variant="sale">
                %{Math.round(((product.compareAtPrice! - currentPrice) / product.compareAtPrice!) * 100)}
              </Badge>
            </div>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((_, i) => (
              <div key={i} className="aspect-square bg-neutral-100 rounded-md flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-neutral-950 transition-all">
                <svg className="w-8 h-8 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-950 leading-tight">{product.name}</h1>

        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-neutral-950">{formatPrice(currentPrice)}</span>
          {hasDiscount && (
            <span className="text-lg text-neutral-400 line-through">{formatPrice(product.compareAtPrice!)}</span>
          )}
        </div>

        {/* Stock status */}
        <div className="mt-3">
          {inStock ? (
            <span className="text-sm text-green-700">Stokta var</span>
          ) : (
            <span className="text-sm text-red-600">Tükendi</span>
          )}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {product.variants[0].name}
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                    selectedVariant === v.id
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-300 hover:border-neutral-400'
                  } ${v.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                  disabled={v.stock === 0}
                >
                  {v.options.join(', ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + Add to cart */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
              aria-label="Azalt"
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-11 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors"
              aria-label="Artır"
            >
              +
            </button>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            size="lg"
            className="flex-1"
          >
            {added ? 'Sepete Eklendi ✓' : 'Sepete Ekle'}
          </Button>
        </div>

        {/* Delivery info */}
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center gap-2 text-neutral-600">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0V5.625" />
            </svg>
            Tahmini teslimat: 2-5 iş günü
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
            14 gün koşulsuz iade
          </div>
        </div>

        {/* Own brand info */}
        {product.isOwnBrand && product.ownBrandInfo && (
          <div className="mt-6">
            <OwnBrandBadge info={product.ownBrandInfo} />
          </div>
        )}

        {/* Attributes */}
        {product.attributes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-neutral-950 mb-3">Ürün Özellikleri</h3>
            <dl className="space-y-2">
              {product.attributes.map((attr, i) => (
                <div key={i} className="flex text-sm">
                  <dt className="w-32 text-neutral-500 flex-shrink-0">{attr.name}</dt>
                  <dd className="text-neutral-800">{attr.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Description */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-neutral-950 mb-2">Açıklama</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">{product.description}</p>
        </div>

        {/* SKU */}
        <p className="mt-4 text-xs text-neutral-400">SKU: {product.sku}</p>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-bold text-neutral-950">{formatPrice(currentPrice)}</p>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="flex-1"
          >
            {added ? 'Eklendi ✓' : 'Sepete Ekle'}
          </Button>
        </div>
      </div>
    </div>
  );
}
