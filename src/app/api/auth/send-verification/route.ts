import { NextRequest, NextResponse } from 'next/server';
import { createVerificationToken } from '@/lib/utils/token';
import { sendVerificationEmail } from '@/lib/utils/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-posta adresi gerekli.' }, { status: 400 });
    }

    const token = createVerificationToken(email);
    const result = await sendVerificationEmail(email, token);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Doğrulama e-postası gönderildi.' });
  } catch {
    return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
  }
}
