'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/lib/commerce/cart-store';
import { categories } from '@/lib/data/categories';
import { MobileNav } from './mobile-nav';
import { SearchBar } from './search-bar';
import { AccountDropdown } from './account-dropdown';

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        {/* Top bar */}
        <div className="bg-neutral-950 text-white text-xs text-center py-1.5 px-4">
          <p>500 TL ve üzeri siparişlerde ücretsiz kargo</p>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Menüyü aç"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold tracking-tight text-neutral-950">BILGE HYBRID</span>
          </Link>

          {/* Desktop search */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Ara"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

            {/* Account dropdown */}
            <AccountDropdown />

            {/* Favorites */}
            <Link href="/hesabim/favorilerim" className="hidden sm:flex p-2 hover:bg-neutral-100 rounded-lg transition-colors" aria-label="Favorilerim">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/sepet" className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors" aria-label="Sepetim">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-950 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <SearchBar onSearch={() => setSearchOpen(false)} />
          </div>
        )}

        {/* Desktop navigation */}
        <nav className="hidden lg:block border-t border-neutral-100">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-8 h-11 text-sm">
              {categories.map((cat) => (
                <li key={cat.id} className="group relative">
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-neutral-600 hover:text-neutral-950 transition-colors py-3"
                  >
                    {cat.name}
                  </Link>
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="bg-white border border-neutral-200 rounded-lg shadow-lg p-4 min-w-[220px]">
                      <ul className="space-y-1">
                        {cat.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/kategori/${cat.slug}/${sub.slug}`}
                              className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 rounded-md transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <MobileNav open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
