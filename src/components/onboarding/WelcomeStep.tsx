'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../icons/logo';
import { motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { LANGUAGES } from '@/lib/constants';

interface WelcomeStepProps {
  onComplete: () => void;
}

export default function WelcomeStep({ onComplete }: WelcomeStepProps) {
  const { user, setUser } = useUser();

  const handleLanguageSelect = (lang: string) => {
    setUser({ ...user, language: lang });
  };
  
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
      <div className="absolute top-4 right-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                    <Globe className="mr-2 h-4 w-4" />
                    {user?.language || 'English'}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {LANGUAGES.map(lang => (
                    <DropdownMenuItem key={lang} onClick={() => handleLanguageSelect(lang)}>
                        {lang}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
          The first-ever app dedicated to helping patients with chronic diseases.
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
