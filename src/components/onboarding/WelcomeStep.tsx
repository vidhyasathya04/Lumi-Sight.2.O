'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../icons/logo';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onComplete: () => void;
}

export default function WelcomeStep({ onComplete }: WelcomeStepProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <motion.div 
        className="text-center p-8 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo className="h-24 w-24 text-primary" />
        
        <h1 className="mt-6 text-4xl md:text-5xl font-headline font-bold text-gray-800">
          Chronic Disease – First-ever App to Help Patients
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Start your health journey now.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10"
        >
          <Button size="lg" className="h-14 px-10 text-lg font-headline rounded-full shadow-lg" onClick={onComplete}>
            Start
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
