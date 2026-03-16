import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function sendVerificationEmail(email: string, token: string): Promise<{ success: boolean; error?: string }> {
  const verificationUrl = `${APP_URL}/dogrulama?token=${token}`;

  try {
    const { error } = await resend.emails.send({
      from: `Bilge Hybrid <${FROM_EMAIL}>`,
      to: email,
      subject: 'E-posta Adresinizi Doğrulayın - Bilge Hybrid',
      html: `
<!DOCTYPE html>
<html lang="tr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background-color:#f5f5f5;">
  <div style="max-width:520px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;">

    <div style="background:#0a0a0a;padding:24px 32px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:1px;">BILGE HYBRID</h1>
    </div>

    <div style="padding:32px;">
      <h2 style="margin:0 0 12px;color:#171717;font-size:18px;font-weight:600;">E-posta Doğrulama</h2>
      <p style="margin:0 0 24px;color:#525252;font-size:14px;line-height:1.6;">
        Bilge Hybrid'e hoş geldiniz! Hesabınızı aktifleştirmek için aşağıdaki butona tıklayarak e-posta adresinizi doğrulayın.
      </p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${verificationUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:14px;font-weight:600;">
          E-postamı Doğrula
        </a>
      </div>

      <p style="margin:0 0 8px;color:#a3a3a3;font-size:12px;">
        Buton çalışmıyorsa aşağıdaki linki tarayıcınıza yapıştırın:
      </p>
      <p style="margin:0 0 24px;color:#525252;font-size:12px;word-break:break-all;">
        ${verificationUrl}
      </p>

      <hr style="border:none;border-top:1px solid #e5e5e5;margin:24px 0;">

      <p style="margin:0;color:#a3a3a3;font-size:11px;line-height:1.5;">
        Bu link 1 saat içinde geçerliliğini yitirecektir. Bu e-postayı siz talep etmediyseniz, lütfen dikkate almayın.
      </p>
    </div>

    <div style="background:#fafafa;padding:16px 32px;text-align:center;">
      <p style="margin:0;color:#a3a3a3;font-size:11px;">&copy; ${new Date().getFullYear()} Bilge Hybrid. Tüm hakları saklıdır.</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: 'E-posta gönderilemedi.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Email service error:', err);
    return { success: false, error: 'E-posta servisi hatası.' };
  }
}
