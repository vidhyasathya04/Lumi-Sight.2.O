'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import LanguageSelection from '@/components/onboarding/LanguageSelection';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import RegistrationForm from '@/components/onboarding/RegistrationForm';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeStep from '@/components/onboarding/WelcomeStep';

export default function OnboardingPage() {
  const { user } = useUser();

  const getInitialStep = () => {
    // Always start at the welcome step for a new session if no language is set.
    // This logic can be adjusted based on how persistent you want the "skip" to be.
    if (!user?.language) return 1;
    if (!user?.userType) return 3; // Skip welcome and lang
    if (!user?.name) return 4; // Skip to form
    return 1; // Default to welcome
  };

  const [step, setStep] = useState(getInitialStep());

  const nextStep = () => setStep(s => s + 1);
  const skipToForm = () => setStep(4);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep key="step1" onComplete={nextStep} />;
      case 2:
        return <LanguageSelection key="step2" onComplete={nextStep} />;
      case 3:
        return <UserTypeSelection key="step3" onComplete={nextStep} />;
      case 4:
        return <RegistrationForm key="step4" />;
      default:
        // This handles re-entry for partially completed profiles
        if (!user?.language) return <LanguageSelection key="step2" onComplete={nextStep} />;
        if (!user?.userType) return <UserTypeSelection key="step3" onComplete={nextStep} />;
        return <RegistrationForm key="step4" />;
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
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
