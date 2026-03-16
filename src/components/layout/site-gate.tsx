'use client';

import { useState, useEffect } from 'react';

const SITE_PASSWORD = 'sifre123';
const STORAGE_KEY = 'bilge-hybrid-site-access';

export function SiteGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      setUnlocked(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'granted');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-neutral-950 z-[100]" />
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-neutral-950 z-[100] flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">BILGE HYBRID</h1>
          <p className="text-neutral-500 text-sm mt-2">Bu site şu an geliştirme aşamasındadır.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Şifre girin"
              autoFocus
              className={`w-full h-12 px-4 text-sm bg-white/10 border rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors ${
                error ? 'border-red-500' : 'border-white/20'
              }`}
            />
            {error && (
              <p className="text-red-400 text-xs mt-2">Şifre hatalı.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-neutral-950 font-medium rounded-lg hover:bg-neutral-200 transition-colors text-sm"
          >
            Giriş
          </button>
        </form>
      </div>
    </div>
  );
}
