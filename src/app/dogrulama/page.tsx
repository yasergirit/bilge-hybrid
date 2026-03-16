'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';

export default function VerificationPage() {
  const { isAuthenticated, user } = useAuth();
  const [status, setStatus] = useState<'checking' | 'success' | 'waiting'>('checking');

  useEffect(() => {
    // Supabase automatically handles the token from the URL hash
    // If user is authenticated and email is verified, show success
    if (isAuthenticated && user?.emailVerified) {
      setStatus('success');
    } else if (isAuthenticated) {
      setStatus('waiting');
    } else {
      // Give Supabase a moment to process the auth callback
      const timer = setTimeout(() => {
        setStatus('waiting');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  if (status === 'checking') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-2 border-neutral-300 border-t-neutral-950 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-neutral-500">Doğrulanıyor...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">E-posta Doğrulandı!</h1>
        <p className="text-neutral-500 mb-6">Hesabınız başarıyla aktifleştirildi.</p>
        <Link href="/hesabim"><Button size="lg">Hesabıma Git</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-neutral-950 mb-2">E-posta Doğrulama Bekleniyor</h1>
      <p className="text-neutral-500 mb-6">Lütfen e-postanızdaki doğrulama linkine tıklayın.</p>
      <Link href="/giris"><Button>Giriş Yap</Button></Link>
    </div>
  );
}
