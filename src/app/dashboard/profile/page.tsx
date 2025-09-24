'use client';

import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useUser();
  const avatarImage = PlaceHolderImages.find(p => p.id === 'user-avatar-1');
  
  if (!user) {
    return null;
  }

  const profileDetails = [
      { label: 'Age', value: user.age },
      { label: 'Gender', value: user.gender },
      { label: 'Location', value: user.location },
      { label: 'Has Diabetes', value: user.hasDiabetes },
      { label: 'Blood Group', value: user.bloodGroup },
      { label: 'Last Eye Checkup', value: user.lastEyeCheckup },
      { label: 'Willing to Donate Blood', value: user.willingToDonateBlood },
  ];

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="items-center text-center relative">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50">
            {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={user.name || 'User'} />}
            <AvatarFallback className="text-3xl">{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription>{user.userType}</CardDescription>
          <Button variant="outline" size="icon" className="absolute top-4 right-4">
              <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {profileDetails.map(detail => (
                <div key={detail.label} className="py-4 grid grid-cols-3 gap-4 items-center">
                    <p className="text-sm font-medium text-muted-foreground col-span-1">{detail.label}</p>
                    <p className="text-sm font-semibold col-span-2">{String(detail.value)}</p>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
