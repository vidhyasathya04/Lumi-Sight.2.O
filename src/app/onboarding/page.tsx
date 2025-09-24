'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import LanguageSelection from '@/components/onboarding/LanguageSelection';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import RegistrationForm from '@/components/onboarding/RegistrationForm';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import { useRouter } from 'next/navigation';
import MainFeaturesPage from '@/components/onboarding/MainFeaturesPage';

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();

  // Always start at the welcome step for a new session.
  const [step, setStep] = useState(1);

  // If a user profile is complete, redirect to dashboard.
  useEffect(() => {
    if (user?.name && user?.userType) {
      router.replace('/dashboard');
    }
  }, [user, router]);


  const nextStep = () => setStep(s => s + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep key="step1" onComplete={nextStep} />;
      case 2:
        return <LanguageSelection key="step2" onComplete={nextStep} />;
      case 3:
        return <MainFeaturesPage key="step3" onComplete={nextStep} />;
      case 4:
        return <UserTypeSelection key="step4" onComplete={nextStep} />;
      case 5:
        return <RegistrationForm key="step5" />;
      default:
        return <WelcomeStep key="step1" onComplete={nextStep} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
