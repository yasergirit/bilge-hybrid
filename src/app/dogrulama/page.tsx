'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';

export default function VerificationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-2 border-neutral-300 border-t-neutral-950 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-neutral-500">Doğrulanıyor...</p>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  );
}

function VerificationContent() {
  const searchParams = useSearchParams();
  const { verifyEmail } = useAuth();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Doğrulama tokeni bulunamadı.');
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token!)}`);
        const data = await res.json();

        if (data.valid && data.email) {
          verifyEmail(data.email);
          setStatus('success');
        } else {
          setStatus('error');
          setError(data.error || 'Doğrulama başarısız.');
        }
      } catch {
        setStatus('error');
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }

    verify();
  }, [token, verifyEmail]);

  if (status === 'loading') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-2 border-neutral-300 border-t-neutral-950 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-neutral-500">E-posta adresiniz doğrulanıyor...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 mb-2">Doğrulama Başarısız</h1>
        <p className="text-neutral-500 mb-6">{error}</p>
        <div className="flex flex-col gap-3 items-center">
          <Link href="/giris"><Button>Giriş Yap</Button></Link>
          <Link href="/kayit" className="text-sm text-neutral-500 hover:text-neutral-950 underline underline-offset-4">
            Yeniden kayıt ol
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-neutral-950 mb-2">E-posta Doğrulandı!</h1>
      <p className="text-neutral-500 mb-6">
        Hesabınız başarıyla aktifleştirildi. Artık giriş yaparak alışverişe başlayabilirsiniz.
      </p>
      <Link href="/giris"><Button size="lg">Giriş Yap</Button></Link>
    </div>
  );
}
