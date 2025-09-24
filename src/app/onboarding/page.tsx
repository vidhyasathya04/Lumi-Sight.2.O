'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import LanguageSelection from '@/components/onboarding/LanguageSelection';
import UserTypeSelection from '@/components/onboarding/UserTypeSelection';
import RegistrationForm from '@/components/onboarding/RegistrationForm';
import { AnimatePresence, motion } from 'framer-motion';

export default function OnboardingPage() {
  const { user } = useUser();

  const getInitialStep = () => {
    if (!user?.language) return 1;
    if (!user?.userType) return 2;
    return 3;
  };
  const [step, setStep] = useState(getInitialStep());

  const nextStep = () => setStep(s => s + 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <LanguageSelection key="step1" onComplete={nextStep} />;
      case 2:
        return <UserTypeSelection key="step2" onComplete={nextStep} />;
      case 3:
        return <RegistrationForm key="step3" />;
      default:
        return <LanguageSelection key="default" onComplete={nextStep} />;
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
