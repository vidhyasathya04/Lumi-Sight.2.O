'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, Eye, Heart, Microscope } from 'lucide-react';

interface MainFeaturesPageProps {
  onComplete: () => void;
}

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

const cardHover = {
  scale: 1.05,
  boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.1)',
  transition: { duration: 0.3 }
};


export default function MainFeaturesPage({ onComplete }: MainFeaturesPageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center w-full max-w-5xl mx-auto"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-headline font-bold text-primary">
          LumiSight
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-headline mt-2 text-foreground">
          Chronic Disease
        </motion.h2>
        <motion.p variants={itemVariants} className="mt-4 text-lg text-muted-foreground">
          The first-ever app dedicated to helping patients with chronic diseases.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10">
          <h3 className="text-xl font-headline font-semibold">Current Features:</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} whileHover={cardHover}>
              <Card className="text-left overflow-hidden cursor-pointer" onClick={onComplete}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Eye className="w-10 h-10 text-primary" />
                    <CardTitle className="font-headline text-2xl">Retinopathy Screening</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">Scan your eyes and check for retinopathy risk using our advanced AI.</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={cardHover}>
              <Card className="text-left overflow-hidden cursor-pointer" onClick={onComplete}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Heart className="w-10 h-10 text-red-500" />
                    <CardTitle className="font-headline text-2xl">Blood Donation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">Find donors, donate blood, or request help in emergencies.</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-xl font-headline font-semibold">Coming Soon...</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-50">
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Microscope className="w-10 h-10 text-muted-foreground" />
                  <CardTitle className="font-headline text-2xl">Advanced Diagnostics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">More AI-powered tools to monitor your health.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12">
            <Button size="lg" onClick={onComplete} className="font-headline text-lg">
                Continue Setup <ArrowRight className="ml-2"/>
            </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
