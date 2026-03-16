import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = { title: 'Kayıt Ol' };

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-neutral-950 text-center mb-8">Kayıt Ol</h1>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input id="firstName" label="Ad" placeholder="Adınız" required />
          <Input id="lastName" label="Soyad" placeholder="Soyadınız" required />
        </div>
        <Input id="email" label="E-posta" type="email" placeholder="ornek@email.com" required />
        <Input id="phone" label="Telefon" type="tel" placeholder="05XX XXX XX XX" />
        <Input id="password" label="Şifre" type="password" placeholder="En az 8 karakter" required />
        <Input id="confirmPassword" label="Şifre Tekrar" type="password" placeholder="Şifrenizi tekrar girin" required />

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" className="mt-0.5 accent-neutral-950" required />
          <span className="text-xs text-neutral-600">
            <Link href="/sayfa/kvkk-aydinlatma-metni" target="_blank" className="underline">KVKK Aydınlatma Metni</Link>&apos;ni
            ve <Link href="/sayfa/gizlilik-politikasi" target="_blank" className="underline">Gizlilik Politikası</Link>&apos;nı okudum, kabul ediyorum.
          </span>
        </label>

        <Button className="w-full" size="lg">Kayıt Ol</Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Zaten hesabınız var mı?{' '}
        <Link href="/giris" className="text-neutral-950 font-medium hover:underline">Giriş Yapın</Link>
      </p>
    </div>
  );
}
