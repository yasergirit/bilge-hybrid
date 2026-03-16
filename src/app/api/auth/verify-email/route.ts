import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/utils/token';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ valid: false, error: 'Token bulunamadı.' }, { status: 400 });
  }

  const result = verifyToken(token);
  return NextResponse.json(result);
}
