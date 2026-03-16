import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-neutral-200 mb-4">404</h1>
      <h2 className="text-xl font-bold text-neutral-950 mb-2">Sayfa Bulunamadı</h2>
      <p className="text-neutral-500 mb-8">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link href="/">
        <Button size="lg">Ana Sayfaya Dön</Button>
      </Link>
    </div>
  );
}
