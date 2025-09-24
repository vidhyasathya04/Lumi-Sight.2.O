'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/UserContext';
import { USER_TYPES, type UserType } from '@/lib/constants';
import { BriefcaseMedical, HandHeart, Hospital } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

interface UserTypeSelectionProps {
  onComplete: () => void;
}

const typeDetails = {
  Patient: { icon: BriefcaseMedical, description: 'user_type_patient_desc' },
  'Blood Donor': { icon: HandHeart, description: 'user_type_donor_desc' },
  'Healthcare Provider': { icon: Hospital, description: 'user_type_provider_desc' },
};

export default function UserTypeSelection({ onComplete }: UserTypeSelectionProps) {
  const { user, setUser } = useUser();
  const { t } = useTranslation();

  const handleSelect = (type: UserType) => {
    setUser({ ...user, userType: type });
    onComplete();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-4xl shadow-lg border-none bg-card/80 backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          <CardTitle className="font-headline text-3xl">{t('user_type_title')}</CardTitle>
          <CardDescription>{t('user_type_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USER_TYPES.map((type) => {
              const details = typeDetails[type];
              const Icon = details.icon;
              const translatedType = t(type.toLowerCase().replace(' ', '_'));
              return (
                <Card
                  key={type}
                  onClick={() => handleSelect(type)}
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-primary"
                >
                  <CardHeader className="items-center text-center">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="font-headline text-2xl">{translatedType}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{t(details.description)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
