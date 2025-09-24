'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../icons/logo';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onComplete: () => void;
}

export default function WelcomeStep({ onComplete }: WelcomeStepProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-green-50">
      <motion.div
        className="text-center p-8 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
            <Logo className="h-24 w-24 text-primary" />
        </motion.div>
        
        <motion.h1 
          variants={titleVariants}
          className="mt-6 text-5xl md:text-6xl font-headline font-bold text-primary">
          LumiSight
        </motion.h1>
        
        <motion.h2 
          variants={itemVariants}
          className="mt-4 text-xl md:text-2xl font-headline font-bold text-gray-800"
        >
          Chronic Disease – First-ever App to Help Patients
        </motion.h2>

        <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
          Start your health journey now.
        </motion.p>

        <motion.div
          variants={itemVariants}
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
