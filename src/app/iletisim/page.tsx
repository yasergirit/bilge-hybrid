import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bilge Hybrid ile iletişime geçin.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-neutral-950 mb-6">İletişim</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-neutral-600 text-sm leading-relaxed mb-6">
            Sorularınız, önerileriniz veya sipariş takibi için bizimle iletişime geçebilirsiniz.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <div>
                <p className="text-sm font-medium text-neutral-950">E-posta</p>
                <p className="text-sm text-neutral-600">info@bilgehybrid.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-neutral-950">Telefon</p>
                <p className="text-sm text-neutral-600">[Telefon numarası eklenecektir]</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-neutral-950">Adres</p>
                <p className="text-sm text-neutral-600">[Şirket adresi eklenecektir]</p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <Input id="name" label="Ad Soyad" placeholder="Adınız Soyadınız" required />
          <Input id="email" label="E-posta" type="email" placeholder="ornek@email.com" required />
          <Input id="subject" label="Konu" placeholder="Mesajınızın konusu" required />
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">Mesaj</label>
            <textarea
              id="message"
              rows={4}
              placeholder="Mesajınızı yazın..."
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
              required
            />
          </div>
          <Button className="w-full" size="lg">Gönder</Button>
        </form>
      </div>
    </div>
  );
}
