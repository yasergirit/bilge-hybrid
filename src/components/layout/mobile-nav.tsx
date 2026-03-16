'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/data/categories';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-white overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <span className="text-lg font-bold tracking-tight">BILGE HYBRID</span>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg" aria-label="Kapat">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <div className="flex items-center">
                  <Link
                    href={`/kategori/${cat.slug}`}
                    onClick={onClose}
                    className="flex-1 py-3 text-sm font-medium text-neutral-800 hover:text-neutral-950"
                  >
                    {cat.name}
                  </Link>
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                    className="p-2 hover:bg-neutral-100 rounded-lg"
                    aria-label={`${cat.name} alt kategorileri`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

                {expandedCategory === cat.id && (
                  <ul className="ml-4 mb-2 space-y-0.5">
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/kategori/${cat.slug}/${sub.slug}`}
                          onClick={onClose}
                          className="block py-2 text-sm text-neutral-500 hover:text-neutral-950"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <hr className="my-4 border-neutral-200" />

          <ul className="space-y-1">
            <li>
              <Link href="/hesabim" onClick={onClose} className="block py-2.5 text-sm text-neutral-600 hover:text-neutral-950">
                Hesabım
              </Link>
            </li>
            <li>
              <Link href="/hesabim/favorilerim" onClick={onClose} className="block py-2.5 text-sm text-neutral-600 hover:text-neutral-950">
                Favorilerim
              </Link>
            </li>
            <li>
              <Link href="/hakkimizda" onClick={onClose} className="block py-2.5 text-sm text-neutral-600 hover:text-neutral-950">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/iletisim" onClick={onClose} className="block py-2.5 text-sm text-neutral-600 hover:text-neutral-950">
                İletişim
              </Link>
            </li>
            <li>
              <Link href="/sss" onClick={onClose} className="block py-2.5 text-sm text-neutral-600 hover:text-neutral-950">
                Sık Sorulan Sorular
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
