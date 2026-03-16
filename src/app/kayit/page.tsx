'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/commerce/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, isAuthenticated, resendVerification } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (isAuthenticated && step !== 2) {
      router.push('/hesabim');
    }
  }, [isAuthenticated, router, step]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleGoogle = async () => {
    await loginWithGoogle();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    if (!kvkkAccepted) {
      setError('KVKK Aydınlatma Metni\'ni onaylamanız gerekmektedir.');
      return;
    }

    setLoading(true);

    const result = await register({
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
    });

    setLoading(false);

    if (result.success) {
      setStep(2); // Show "check your email" screen
    } else {
      setError(result.error || 'Kayıt başarısız.');
    }
  };

  const handleResend = async () => {
    setLoading(true);
    await resendVerification(email.trim());
    setLoading(false);
    setResendCooldown(60);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Kayıt Ol</h1>
        <p className="text-sm text-neutral-500 mt-1">
          {step === 1 ? 'Hesap bilgilerinizi girin.' : 'E-posta adresinizi doğrulayın.'}
        </p>
      </div>

      {step === 1 && (
        <>
          <button
            onClick={handleGoogle}
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

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <label className="flex items-start gap-2.5 cursor-pointer pt-2">
              <input type="checkbox" checked={kvkkAccepted} onChange={(e) => setKvkkAccepted(e.target.checked)} className="mt-0.5 accent-neutral-950" required />
              <span className="text-xs text-neutral-600 leading-relaxed">
                <Link href="/sayfa/kvkk-aydinlatma-metni" target="_blank" className="underline font-medium hover:text-neutral-950">KVKK Aydınlatma Metni</Link>&apos;ni ve{' '}
                <Link href="/sayfa/gizlilik-politikasi" target="_blank" className="underline font-medium hover:text-neutral-950">Gizlilik Politikası</Link>&apos;nı okudum, kabul ediyorum. *
              </span>
            </label>

            <Button className="w-full" size="lg" disabled={loading}>
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </Button>
          </form>
        </>
      )}

      {/* Step 2: Email verification pending */}
      {step === 2 && (
        <div className="text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-950 mb-2">E-postanızı Kontrol Edin</h2>
          <p className="text-sm text-neutral-500 mb-1">Doğrulama linki aşağıdaki adrese gönderildi:</p>
          <p className="text-sm font-semibold text-neutral-950 mb-6">{email}</p>
          <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600 mb-6">
            <p>E-postanızdaki linke tıklayarak hesabınızı aktifleştirin.</p>
          </div>
          <p className="text-xs text-neutral-400 mb-4">E-posta gelmedi mi? Spam klasörünüzü kontrol edin.</p>
          <button
            onClick={handleResend}
            disabled={loading || resendCooldown > 0}
            className="text-sm text-neutral-600 hover:text-neutral-950 underline underline-offset-4 transition-colors disabled:opacity-50"
          >
            {resendCooldown > 0 ? `Tekrar gönder (${resendCooldown}s)` : 'Doğrulama e-postasını tekrar gönder'}
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-500">
            Zaten hesabınız var mı?{' '}
            <Link href="/giris" className="text-neutral-950 font-semibold hover:underline">Giriş Yap</Link>
          </p>
        </div>
      )}
    </div>
  );
}
