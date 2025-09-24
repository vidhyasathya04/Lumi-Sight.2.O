'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { BloodGroup, DiabetesStatus, LastCheckup, UserType, WillingToDonate } from '@/lib/constants';
import { LANGUAGES } from '@/lib/constants';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';
import ta from '@/locales/ta.json';

const translations: Record<string, any> = {
  'English': en,
  'हिंदी': hi,
  'தமிழ்': ta,
};

export type UserProfile = {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: string;
  hasDiabetes: DiabetesStatus;
  bloodGroup: BloodGroup;
  lastEyeCheckup: LastCheckup;
  willingToDonateBlood: WillingToDonate;
  userType: UserType;
  language: string;
};

type UserContextType = {
  user: Partial<UserProfile> | null;
  setUser: (user: Partial<UserProfile> | null) => void;
  isLoading: boolean;
  t: (key: string) => string;
  currentLanguage: string;
  setLanguage: (lang: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Partial<UserProfile> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<string>('English');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lumiSightUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        if (LANGUAGES.includes(parsedUser.language)) {
          setCurrentLanguage(parsedUser.language);
        }
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('lumiSightUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLanguage = useCallback((lang: string) => {
    if (LANGUAGES.includes(lang)) {
      setCurrentLanguage(lang);
      const updatedUser = { ...(user || {}), language: lang };
      setUserState(updatedUser);
      localStorage.setItem('lumiSightUser', JSON.stringify(updatedUser));
    }
  }, [user]);

  const setUser = (newUser: Partial<UserProfile> | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('lumiSightUser', JSON.stringify(newUser));
      if (newUser.language && LANGUAGES.includes(newUser.language)) {
        setCurrentLanguage(newUser.language);
      }
    } else {
      localStorage.removeItem('lumiSightUser');
    }
  };

  const t = useCallback((key: string): string => {
    return translations[currentLanguage]?.[key] || translations['English']?.[key] || key;
  }, [currentLanguage]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, t, currentLanguage, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
