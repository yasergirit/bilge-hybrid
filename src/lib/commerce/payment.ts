import type { PaymentProvider, PaymentRequest, PaymentResult } from '@/lib/types';

// Payment abstraction layer — provider-agnostic
// Ready for Turkish payment systems: iyzico, PayTR, Param, bank POS, etc.

const providers: PaymentProvider[] = [
  { id: 'credit-card', name: 'Kredi / Banka Kartı', type: 'credit-card', isActive: true },
  { id: 'bank-transfer', name: 'Havale / EFT', type: 'bank-transfer', isActive: true },
  { id: 'cash-on-delivery', name: 'Kapıda Ödeme', type: 'cash-on-delivery', isActive: true },
];

export function getActivePaymentProviders(): PaymentProvider[] {
  return providers.filter((p) => p.isActive);
}

export async function processPayment(request: PaymentRequest): Promise<PaymentResult> {
  // TODO: Replace with actual payment provider integration
  // This mock simulates a successful payment for development
  console.log('Processing payment:', request.provider, request.amount, request.currency);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (request.provider === 'credit-card') {
    // In production: call iyzico/PayTR/Param API here
    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
    };
  }

  if (request.provider === 'bank-transfer') {
    return {
      success: true,
      transactionId: `BT-${Date.now()}`,
    };
  }

  if (request.provider === 'cash-on-delivery') {
    return {
      success: true,
      transactionId: `COD-${Date.now()}`,
    };
  }

  return { success: false, error: 'Geçersiz ödeme yöntemi' };
}
