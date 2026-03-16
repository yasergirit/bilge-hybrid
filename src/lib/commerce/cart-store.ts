'use client';

import { useSyncExternalStore, useCallback } from 'react';
import type { CartItem } from '@/lib/types';

interface CartState {
  items: CartItem[];
  couponCode: string;
}

const STORAGE_KEY = 'bilge-hybrid-cart';

function getInitialState(): CartState {
  if (typeof window === 'undefined') return { items: [], couponCode: '' };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { items: [], couponCode: '' };
  } catch {
    return { items: [], couponCode: '' };
  }
}

let state: CartState = getInitialState();
const listeners = new Set<() => void>();

function emitChange() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartState {
  return state;
}

const SERVER_SNAPSHOT: CartState = { items: [], couponCode: '' };

function getServerSnapshot(): CartState {
  return SERVER_SNAPSHOT;
}

export function useCart() {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: CartItem) => {
    const existing = state.items.find(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    );
    if (existing) {
      state = {
        ...state,
        items: state.items.map((i) =>
          i.productId === item.productId && i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    } else {
      state = { ...state, items: [...state.items, item] };
    }
    emitChange();
  }, []);

  const removeItem = useCallback((productId: string, variantId?: string) => {
    state = {
      ...state,
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      ),
    };
    emitChange();
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      state = {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === productId && i.variantId === variantId)
        ),
      };
    } else {
      state = {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity }
            : i
        ),
      };
    }
    emitChange();
  }, []);

  const setCoupon = useCallback((code: string) => {
    state = { ...state, couponCode: code };
    emitChange();
  }, []);

  const clearCart = useCallback(() => {
    state = { items: [], couponCode: '' };
    emitChange();
  }, []);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingEstimate = subtotal >= 500 ? 0 : 49.90;
  const discount = 0; // TODO: implement coupon logic
  const total = subtotal + shippingEstimate - discount;

  return {
    items: cart.items,
    couponCode: cart.couponCode,
    subtotal,
    shippingEstimate,
    discount,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    setCoupon,
    clearCart,
  };
}
