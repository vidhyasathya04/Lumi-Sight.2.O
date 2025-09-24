'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Globe } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { LANGUAGES } from '@/lib/constants';

interface LanguageSelectionProps {
  onComplete: () => void;
}

export default function LanguageSelection({ onComplete }: LanguageSelectionProps) {
  const { user, setUser } = useUser();

  const handleLanguageSelect = (lang: string) => {
    setUser({ ...user, language: lang });
    onComplete();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg border-none bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          <Globe className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="font-headline text-3xl">Choose Your Language</CardTitle>
          <CardDescription>Select your preferred language to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
            {LANGUAGES.map((lang) => (
              <Button
                key={lang}
                variant="outline"
                className="w-full h-12 text-sm md:text-base border-primary/20 hover:bg-primary/10"
                onClick={() => handleLanguageSelect(lang)}
              >
                {lang}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
