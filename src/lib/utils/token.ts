import crypto from 'crypto';

const SECRET = process.env.VERIFICATION_SECRET || 'bilge-hybrid-verification-secret-change-in-production';

interface TokenPayload {
  email: string;
  exp: number;
}

export function createVerificationToken(email: string, expiresInMinutes = 60): string {
  const payload: TokenPayload = {
    email,
    exp: Date.now() + expiresInMinutes * 60 * 1000,
  };

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('base64url');

  return `${data}.${signature}`;
}

export function verifyToken(token: string): { valid: boolean; email?: string; error?: string } {
  try {
    const [data, signature] = token.split('.');
    if (!data || !signature) {
      return { valid: false, error: 'Geçersiz token formatı.' };
    }

    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(data)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return { valid: false, error: 'Token doğrulanamadı.' };
    }

    const payload: TokenPayload = JSON.parse(Buffer.from(data, 'base64url').toString());

    if (Date.now() > payload.exp) {
      return { valid: false, error: 'Token süresi dolmuş. Lütfen yeni doğrulama e-postası isteyin.' };
    }

    return { valid: true, email: payload.email };
  } catch {
    return { valid: false, error: 'Token işlenirken hata oluştu.' };
  }
}
