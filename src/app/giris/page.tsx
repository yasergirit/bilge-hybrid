import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = { title: 'Giriş Yap' };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-950 text-center mb-8">Giriş Yap</h1>

      <form className="space-y-4">
        <Input id="email" label="E-posta" type="email" placeholder="ornek@email.com" required />
        <Input id="password" label="Şifre" type="password" placeholder="••••••••" required />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-neutral-950" />
            <span className="text-neutral-600">Beni hatırla</span>
          </label>
          <a href="#" className="text-neutral-600 hover:text-neutral-950 transition-colors">Şifremi unuttum</a>
        </div>

        <Button className="w-full" size="lg">Giriş Yap</Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Hesabınız yok mu?{' '}
        <Link href="/kayit" className="text-neutral-950 font-medium hover:underline">Kayıt Olun</Link>
      </p>
    </div>
  );
}
