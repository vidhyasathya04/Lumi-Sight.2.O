'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user?.userType && user?.name) {
        router.replace('/dashboard');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <Logo className="h-16 w-16 text-primary animate-pulse" />
        <h1 className="text-3xl font-headline font-bold text-primary">LumiSight</h1>
        <p className="text-muted-foreground">Your Vision, Our Mission.</p>
        <Loader2 className="mt-4 h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
