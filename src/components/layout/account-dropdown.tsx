'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/commerce/auth-store';

export function AccountDropdown() {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        aria-label="Hesabım"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {isAuthenticated && user ? (
            <>
              <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-200">
                <p className="text-sm font-semibold text-neutral-950">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <Link href="/hesabim" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                  Hesabım
                </Link>
                <Link href="/hesabim/siparislerim" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
                  Siparişlerim
                </Link>
                <Link href="/hesabim/favorilerim" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                  Favorilerim
                </Link>
              </div>
              <div className="border-t border-neutral-200 py-1">
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4">
                <p className="text-sm font-semibold text-neutral-950 mb-1">Hesabınıza giriş yapın</p>
                <p className="text-xs text-neutral-500 mb-4">Siparişlerinizi takip edin, favorilerinizi kaydedin.</p>
                <Link href="/giris" onClick={() => setOpen(false)} className="flex items-center justify-center w-full h-11 bg-neutral-950 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors mb-2">
                  Giriş Yap
                </Link>
                <Link href="/kayit" onClick={() => setOpen(false)} className="flex items-center justify-center w-full h-11 border border-neutral-300 text-neutral-950 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                  Kayıt Ol
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
