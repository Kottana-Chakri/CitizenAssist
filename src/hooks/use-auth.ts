import { useEffect, useMemo, useState } from 'react';
import type { UserProfile } from '@/types/chat';

const STORAGE_KEY = 'caf_user_profile_v1';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfile;
        if (parsed?.id && parsed?.email) setUser(parsed);
      }
    } catch {}
  }, []);

  const login = (name: string, email: string) => {
    const profile: UserProfile = {
      id: email.trim().toLowerCase(),
      name: name.trim(),
      email: email.trim(),
      createdAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return useMemo(() => ({ user, login, logout }), [user]);
}
