'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1 fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2 fields (address)
  const [addressTitle, setAddressTitle] = useState('Ev');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Agreements
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/hesabim');
    }
  }, [isAuthenticated, router]);

  const handleGoogleRegister = () => {
    const result = loginWithGoogle();
    if (result.success) {
      router.push('/hesabim');
    }
  };

  const validateStep1 = (): boolean => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !password) {
      setError('Lütfen tüm zorunlu alanları doldurun.');
      return false;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return false;
    }
    if (!kvkkAccepted) {
      setError('KVKK Aydınlatma Metni\'ni onaylamanız gerekmektedir.');
      return false;
    }
    setError('');
    return true;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise((r) => setTimeout(r, 500));

    const result = register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      address: city ? {
        title: addressTitle,
        city,
        district,
        neighborhood,
        addressLine,
        postalCode,
      } : undefined,
    });

    if (result.success) {
      router.push('/hesabim');
    } else {
      setError(result.error || 'Kayıt başarısız.');
      setLoading(false);
    }
  };

  const skipAddress = async () => {
    setLoading(true);
    setError('');

    await new Promise((r) => setTimeout(r, 500));

    const result = register({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
    });

    if (result.success) {
      router.push('/hesabim');
    } else {
      setError(result.error || 'Kayıt başarısız.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Kayıt Ol</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {step === 1 ? 'Hesap bilgilerinizi girin.' : 'Adres bilgilerinizi ekleyin (isteğe bağlı).'}
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
          {step > 1 ? '✓' : '1'}
        </div>
        <div className="w-12 h-px bg-neutral-300" />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-neutral-950 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
          2
        </div>
      </div>

      {step === 1 && (
        <>
          {/* Google register */}
          <button
            onClick={handleGoogleRegister}
            className="flex items-center justify-center gap-3 w-full h-12 border border-neutral-300 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google ile kayıt ol
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-neutral-400">veya e-posta ile</span></div>
          </div>

          <form onSubmit={handleStep1Submit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input id="firstName" label="Ad *" placeholder="Adınız" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              <Input id="lastName" label="Soyad *" placeholder="Soyadınız" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <Input id="email" label="E-posta Adresi *" type="email" placeholder="ornek@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <Input id="phone" label="Telefon Numarası *" type="tel" placeholder="05XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <Input id="password" label="Şifre *" type="password" placeholder="En az 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <Input id="confirmPassword" label="Şifre Tekrar *" type="password" placeholder="Şifrenizi tekrar girin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            {/* Agreements */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kvkkAccepted}
                  onChange={(e) => setKvkkAccepted(e.target.checked)}
                  className="mt-0.5 accent-neutral-950"
                  required
                />
                <span className="text-xs text-neutral-600 leading-relaxed">
                  <Link href="/sayfa/kvkk-aydinlatma-metni" target="_blank" className="underline font-medium hover:text-neutral-950">KVKK Aydınlatma Metni</Link>&apos;ni ve{' '}
                  <Link href="/sayfa/gizlilik-politikasi" target="_blank" className="underline font-medium hover:text-neutral-950">Gizlilik Politikası</Link>&apos;nı okudum, kabul ediyorum. *
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingAccepted}
                  onChange={(e) => setMarketingAccepted(e.target.checked)}
                  className="mt-0.5 accent-neutral-950"
                />
                <span className="text-xs text-neutral-600 leading-relaxed">
                  Kampanya ve fırsatlardan haberdar olmak için e-posta ve SMS almak istiyorum.
                </span>
              </label>
            </div>

            <Button className="w-full" size="lg">
              Devam Et
            </Button>
          </form>
        </>
      )}

      {step === 2 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
          )}

          <div className="border border-neutral-200 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-neutral-950 mb-4">Teslimat Adresi</h2>
            <p className="text-xs text-neutral-500 mb-4">Adres bilgilerinizi şimdi ekleyebilir veya daha sonra hesabınızdan ekleyebilirsiniz.</p>

            <div className="space-y-4">
              <Input id="addressTitle" label="Adres Başlığı" placeholder="Ev, İş vb." value={addressTitle} onChange={(e) => setAddressTitle(e.target.value)} />

              <div className="grid grid-cols-2 gap-4">
                <Input id="city" label="İl" placeholder="İstanbul" value={city} onChange={(e) => setCity(e.target.value)} />
                <Input id="district" label="İlçe" placeholder="Kadıköy" value={district} onChange={(e) => setDistrict(e.target.value)} />
              </div>

              <Input id="neighborhood" label="Mahalle" placeholder="Mahalle adı" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />

              <div>
                <label htmlFor="addressLine" className="block text-sm font-medium text-neutral-700 mb-1.5">Açık Adres</label>
                <textarea
                  id="addressLine"
                  rows={3}
                  placeholder="Sokak, bina no, daire no..."
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-950"
                />
              </div>

              <Input id="postalCode" label="Posta Kodu" placeholder="34000" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" type="button" onClick={() => setStep(1)} className="flex-1">
              Geri
            </Button>
            <Button className="flex-1" size="lg" disabled={loading}>
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </Button>
          </div>

          <button
            type="button"
            onClick={skipAddress}
            disabled={loading}
            className="w-full text-sm text-neutral-500 hover:text-neutral-950 underline underline-offset-4 transition-colors py-2"
          >
            Adres eklemeden devam et
          </button>
        </form>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-neutral-500">
          Zaten hesabınız var mı?{' '}
          <Link href="/giris" className="text-neutral-950 font-semibold hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}
