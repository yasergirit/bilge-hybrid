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
              {/* Logged in state */}
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
                <Link href="/hesabim/adreslerim" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                  Adreslerim
                </Link>
              </div>
              <div className="border-t border-neutral-200 py-1">
                <button
                  onClick={() => { logout(); setOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Not logged in */}
              <div className="p-4">
                <p className="text-sm font-semibold text-neutral-950 mb-1">Hesabınıza giriş yapın</p>
                <p className="text-xs text-neutral-500 mb-4">Siparişlerinizi takip edin, favorilerinizi kaydedin.</p>

                <Link
                  href="/giris"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full h-11 bg-neutral-950 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors mb-2"
                >
                  Giriş Yap
                </Link>

                <Link
                  href="/kayit"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full h-11 border border-neutral-300 text-neutral-950 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Kayıt Ol
                </Link>
              </div>

              <div className="px-4 pb-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-neutral-400">veya</span></div>
                </div>

                <button
                  onClick={() => {
                    // TODO: Real Google OAuth
                    setOpen(false);
                    window.location.href = '/giris?provider=google';
                  }}
                  className="flex items-center justify-center gap-2 w-full h-11 mt-3 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google ile devam et
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
