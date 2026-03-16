'use client';

import { useSyncExternalStore, useCallback } from 'react';

export interface UserAddress {
  id: string;
  title: string;
  city: string;
  district: string;
  neighborhood: string;
  addressLine: string;
  postalCode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: UserAddress[];
  createdAt: string;
  provider: 'email' | 'google';
  emailVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'bilge-hybrid-auth';

function getInitialState(): AuthState {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { user: parsed, isAuthenticated: true };
    }
    return { user: null, isAuthenticated: false };
  } catch {
    return { user: null, isAuthenticated: false };
  }
}

let state: AuthState = getInitialState();
const listeners = new Set<() => void>();

function emitChange() {
  if (typeof window !== 'undefined') {
    if (state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): AuthState {
  return state;
}

const SERVER_SNAPSHOT: AuthState = { user: null, isAuthenticated: false };

function getServerSnapshot(): AuthState {
  return SERVER_SNAPSHOT;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address?: {
    title: string;
    city: string;
    district: string;
    neighborhood: string;
    addressLine: string;
    postalCode: string;
  };
}

export function useAuth() {
  const auth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback((email: string, _password: string): { success: boolean; error?: string; needsVerification?: boolean } => {
    // TODO: Replace with real API call
    const registry = getRegistry();
    const existing = registry.find((u) => u.email === email);
    if (existing) {
      if (!existing.emailVerified && existing.provider === 'email') {
        return { success: false, error: 'E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.', needsVerification: true };
      }
      state = { user: existing, isAuthenticated: true };
      emitChange();
      return { success: true };
    }
    return { success: false, error: 'E-posta veya şifre hatalı.' };
  }, []);

  const loginWithGoogle = useCallback((): { success: boolean } => {
    // TODO: Replace with real Google OAuth
    // For demo: create a mock Google user
    const user: User = {
      id: `google-${Date.now()}`,
      firstName: 'Google',
      lastName: 'Kullanıcı',
      email: 'kullanici@gmail.com',
      phone: '',
      addresses: [],
      createdAt: new Date().toISOString(),
      provider: 'google',
      emailVerified: true,
    };
    state = { user, isAuthenticated: true };
    addToRegistry(user);
    emitChange();
    return { success: true };
  }, []);

  const register = useCallback((data: RegisterData): { success: boolean; error?: string } => {
    // TODO: Replace with real API call
    const registry = getRegistry();
    if (registry.find((u) => u.email === data.email)) {
      return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
    }

    const user: User = {
      id: `user-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      emailVerified: false,
      addresses: data.address
        ? [{
            id: `addr-${Date.now()}`,
            title: data.address.title || 'Ev',
            city: data.address.city,
            district: data.address.district,
            neighborhood: data.address.neighborhood,
            addressLine: data.address.addressLine,
            postalCode: data.address.postalCode,
            isDefault: true,
          }]
        : [],
      createdAt: new Date().toISOString(),
      provider: 'email',
    };

    addToRegistry(user);
    // Do NOT auto-login — user must verify email first
    return { success: true };
  }, []);

  const verifyEmail = useCallback((email: string) => {
    const registry = getRegistry();
    const user = registry.find((u) => u.email === email);
    if (user) {
      user.emailVerified = true;
      updateRegistry(user);
      // Auto-login after verification
      state = { user, isAuthenticated: true };
      emitChange();
    }
  }, []);

  const logout = useCallback(() => {
    state = { user: null, isAuthenticated: false };
    emitChange();
  }, []);

  const updateProfile = useCallback((updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => {
    if (!state.user) return;
    state = {
      ...state,
      user: { ...state.user, ...updates },
    };
    updateRegistry(state.user!);
    emitChange();
  }, []);

  const addAddress = useCallback((address: Omit<UserAddress, 'id'>) => {
    if (!state.user) return;
    const newAddress: UserAddress = { ...address, id: `addr-${Date.now()}` };
    state = {
      ...state,
      user: { ...state.user, addresses: [...state.user.addresses, newAddress] },
    };
    updateRegistry(state.user!);
    emitChange();
  }, []);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    login,
    loginWithGoogle,
    register,
    verifyEmail,
    logout,
    updateProfile,
    addAddress,
  };
}

// Simple localStorage user registry for demo
const REGISTRY_KEY = 'bilge-hybrid-users';

function getRegistry(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(REGISTRY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function addToRegistry(user: User) {
  if (typeof window === 'undefined') return;
  const registry = getRegistry();
  registry.push(user);
  localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
}

function updateRegistry(user: User) {
  if (typeof window === 'undefined') return;
  const registry = getRegistry();
  const index = registry.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    registry[index] = user;
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  }
}
