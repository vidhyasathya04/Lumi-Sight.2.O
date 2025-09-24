'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '../icons/logo';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onComplete: () => void;
}

export default function WelcomeStep({ onComplete }: WelcomeStepProps) {
  const appName = "LumiSight";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md shadow-lg border-none bg-card/80 backdrop-blur-sm text-center">
        <CardHeader className="items-center">
          <Logo className="h-20 w-20 text-primary mb-4" />
           <motion.h1
              className="text-4xl font-headline font-bold text-primary flex overflow-hidden"
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
          <CardDescription className="text-lg mt-2">Your Vision, Our Mission.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="w-full font-headline text-lg" onClick={onComplete}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
