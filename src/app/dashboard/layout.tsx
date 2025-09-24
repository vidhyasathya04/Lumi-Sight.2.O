'use client';

import AppSidebar from '@/components/layout/AppSidebar';
import Header from '@/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/logo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/onboarding');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
            <Logo className="h-16 w-16 text-primary animate-pulse" />
            <h1 className="text-3xl font-headline font-bold text-primary">LumiSight</h1>
            <p className="text-muted-foreground">Loading your dashboard...</p>
            <Loader2 className="mt-4 h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/50">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
