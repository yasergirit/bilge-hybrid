'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  emailVerified: boolean;
  provider: string;
}

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

function mapUser(user: SupabaseUser, profile?: { first_name: string; last_name: string; phone: string } | null): UserProfile {
  return {
    id: user.id,
    email: user.email || '',
    firstName: profile?.first_name || user.user_metadata?.first_name || '',
    lastName: profile?.last_name || user.user_metadata?.last_name || '',
    phone: profile?.phone || user.user_metadata?.phone || '',
    emailVerified: !!user.email_confirmed_at,
    provider: user.app_metadata?.provider || 'email',
  };
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Load user on mount and listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch profile from DB
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name, last_name, phone')
            .eq('id', session.user.id)
            .single();
          setUser(mapUser(session.user, profile));
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone')
          .eq('id', session.user.id)
          .single();
        setUser(mapUser(session.user, profile));
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        },
        emailRedirectTo: `${window.location.origin}/dogrulama`,
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return { success: false, error: 'Bu e-posta adresi zaten kayıtlı.' };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  }, [supabase]);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { success: false, error: 'E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.' };
      }
      if (error.message.includes('Invalid login credentials')) {
        return { success: false, error: 'E-posta veya şifre hatalı.' };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  }, [supabase]);

  const loginWithGoogle = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dogrulama`,
      },
    });

    if (error) return { success: false, error: error.message };
    return { success: true };
  }, [supabase]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, [supabase]);

  const updateProfile = useCallback(async (updates: { firstName?: string; lastName?: string; phone?: string }) => {
    if (!user) return;

    const dbUpdates: Record<string, string> = {};
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;

    await supabase.from('profiles').update(dbUpdates).eq('id', user.id);

    setUser((prev) => prev ? {
      ...prev,
      firstName: updates.firstName ?? prev.firstName,
      lastName: updates.lastName ?? prev.lastName,
      phone: updates.phone ?? prev.phone,
    } : null);
  }, [supabase, user]);

  const resendVerification = useCallback(async (email: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${window.location.origin}/dogrulama` },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }, [supabase]);

  // Address operations
  const getAddresses = useCallback(async (): Promise<UserAddress[]> => {
    if (!user) return [];
    const { data } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    return (data || []).map((a) => ({
      id: a.id,
      title: a.title,
      city: a.city,
      district: a.district,
      neighborhood: a.neighborhood || '',
      addressLine: a.address_line,
      postalCode: a.postal_code || '',
      isDefault: a.is_default,
    }));
  }, [supabase, user]);

  const addAddress = useCallback(async (address: Omit<UserAddress, 'id'>) => {
    if (!user) return;
    await supabase.from('addresses').insert({
      user_id: user.id,
      title: address.title,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address_line: address.addressLine,
      postal_code: address.postalCode,
      is_default: address.isDefault,
    });
  }, [supabase, user]);

  return {
    user,
    isAuthenticated: !!user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    resendVerification,
    getAddresses,
    addAddress,
  };
}
