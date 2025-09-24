'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { BloodGroup, DiabetesStatus, LastCheckup, UserType, WillingToDonate } from '@/lib/constants';

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
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<Partial<UserProfile> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('lumiSightUser');
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('lumiSightUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUser = (newUser: Partial<UserProfile> | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('lumiSightUser', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('lumiSightUser');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
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
