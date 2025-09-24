import { HandHeart, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DonateBloodLandingPage() {
  const options = [
    {
      title: 'I am a Donor',
      description: 'Help patients in need by donating blood.',
      icon: HandHeart,
      href: '/dashboard/donate-blood/donor',
      className: 'hover:border-primary hover:bg-primary/5',
      iconClassName: 'text-primary'
    },
    {
      title: 'I am a Patient',
      description: 'Request blood in emergencies or for scheduled treatments.',
      icon: Stethoscope,
      href: '/dashboard/donate-blood/patient',
      className: 'hover:border-red-500 hover:bg-red-500/5',
      iconClassName: 'text-red-500'
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-headline font-bold text-primary">Blood Services</h1>
        <p className="text-lg text-muted-foreground mt-2">Choose your role to get started.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Link href={option.href} key={option.title} className="block">
              <Card className={`text-center h-full transition-all duration-300 ${option.className}`}>
                <CardHeader className="items-center">
                  <div className={`p-4 bg-muted rounded-full mb-4`}>
                    <Icon className={`w-12 h-12 ${option.iconClassName}`} />
                  </div>
                  <CardTitle className="font-headline text-2xl">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{option.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
