'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth, type UserAddress } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';

const accountLinks = [
  { href: '/hesabim/siparislerim', title: 'Siparişlerim', desc: 'Sipariş geçmişi ve takip', icon: 'M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
  { href: '/hesabim/adreslerim', title: 'Adreslerim', desc: 'Teslimat ve fatura adresleri', icon: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' },
  { href: '/hesabim/favorilerim', title: 'Favorilerim', desc: 'Beğendiğiniz ürünler', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z' },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout, getAddresses } = useAuth();
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/giris?redirect=/hesabim');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getAddresses().then(setAddresses);
    }
  }, [isAuthenticated, getAddresses]);

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-neutral-500">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Hesabım</h1>
        <Button variant="ghost" size="sm" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
          Çıkış Yap
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {accountLinks.map((link) => (
          <Link key={link.href} href={link.href} className="border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-colors group">
            <svg className="w-6 h-6 text-neutral-400 group-hover:text-neutral-950 transition-colors mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
            </svg>
            <h2 className="font-semibold text-neutral-950">{link.title}</h2>
            <p className="text-sm text-neutral-500 mt-1">{link.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 border border-neutral-200 rounded-lg p-6">
        <h2 className="font-semibold text-neutral-950 mb-4">Hesap Bilgileri</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-neutral-400 text-xs">Ad Soyad</span>
            <p className="text-neutral-800">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <span className="text-neutral-400 text-xs">E-posta</span>
            <p className="text-neutral-800">{user.email}</p>
          </div>
          <div>
            <span className="text-neutral-400 text-xs">Telefon</span>
            <p className="text-neutral-800">{user.phone || 'Belirtilmemiş'}</p>
          </div>
          <div>
            <span className="text-neutral-400 text-xs">Giriş Yöntemi</span>
            <p className="text-neutral-800">{user.provider === 'google' ? 'Google hesabı' : 'E-posta'}</p>
          </div>
        </div>
      </div>

      {addresses.length > 0 && (
        <div className="mt-6 border border-neutral-200 rounded-lg p-6">
          <h2 className="font-semibold text-neutral-950 mb-4">Kayıtlı Adresler</h2>
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="border border-neutral-100 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-neutral-950">{addr.title}</span>
                  {addr.isDefault && <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">Varsayılan</span>}
                </div>
                <p className="text-neutral-600">
                  {[addr.neighborhood, addr.addressLine, addr.district, addr.city].filter(Boolean).join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
