'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-4 py-12 text-center text-neutral-500">Yükleniyor...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get('redirect') || '/hesabim';
  const provider = searchParams.get('provider');

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect);
    }
  }, [isAuthenticated, router, redirect]);

  useEffect(() => {
    if (provider === 'google') {
      handleGoogleLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  const handleGoogleLogin = () => {
    // TODO: Replace with real Google OAuth flow
    const result = loginWithGoogle();
    if (result.success) {
      router.push(redirect);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 500));

    const result = login(email, password);
    if (result.success) {
      router.push(redirect);
    } else {
      setError(result.error || 'Giriş başarısız.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Giriş Yap</h1>
        <p className="text-sm text-neutral-500 mt-1">Hesabınıza giriş yaparak alışverişe devam edin.</p>
      </div>

      {/* Google login */}
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full h-12 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors mb-4"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Google ile giriş yap
      </button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
        <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-neutral-400">veya e-posta ile</span></div>
      </div>

      {/* Email login form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <Input
          id="email"
          label="E-posta Adresi"
          type="email"
          placeholder="ornek@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Şifre"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-neutral-950 rounded" />
            <span className="text-neutral-600">Beni hatırla</span>
          </label>
          <a href="#" className="text-neutral-500 hover:text-neutral-950 transition-colors">Şifremi unuttum</a>
        </div>

        <Button className="w-full" size="lg" disabled={loading}>
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-500">
          Hesabınız yok mu?{' '}
          <Link href="/kayit" className="text-neutral-950 font-semibold hover:underline">Kayıt Ol</Link>
        </p>
      </div>

      {/* Guest checkout hint */}
      <div className="mt-6 border-t border-neutral-200 pt-6 text-center">
        <p className="text-xs text-neutral-400">
          Üye olmadan da alışveriş yapabilirsiniz.{' '}
          <Link href="/sepet" className="text-neutral-600 hover:text-neutral-950 underline underline-offset-2">
            Misafir olarak devam edin
          </Link>
        </p>
      </div>
    </div>
  );
}
