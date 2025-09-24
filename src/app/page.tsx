'use client';

import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // This timer ensures the splash screen and animation are visible for a moment.
    const timer = setTimeout(() => {
      // We check isLoading here to ensure we don't redirect before user state is determined.
      if (!isLoading) {
        if (user?.userType && user?.name) {
          router.replace('/dashboard');
        } else {
          router.replace('/onboarding');
        }
      }
    }, 2500); // Wait for animation to have some time

    return () => clearTimeout(timer);
    // By including all dependencies, we ensure the effect re-evaluates correctly
    // but the timeout logic inside handles the timing.
  }, [user, isLoading, router]);

  const appName = "LumiSight";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <Logo className="h-16 w-16 text-primary animate-pulse" />
        <motion.h1
          className="text-3xl font-headline font-bold text-primary flex overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={appName}
        >
          {appName.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="text-muted-foreground">Your Vision, Our Mission.</p>
        <Loader2 className="mt-4 h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
