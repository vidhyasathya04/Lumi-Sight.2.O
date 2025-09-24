
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Loader2, Phone, X, ShieldCheck, HeartPulse } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '../ui/alert-dialog';


type Donor = {
    id: number;
    name: string;
    avatar: string;
    distance: string;
    bloodType: string;
    lastDonation: string;
    isVerified: boolean;
};

const mockDonors: Donor[] = [
  { id: 1, name: 'Priya S.', avatar: 'user-avatar-1', distance: '1.2 km', bloodType: 'O+', lastDonation: '3 months ago', isVerified: true },
  { id: 2, name: 'Amit K.', avatar: 'user-avatar-3', distance: '2.5 km', bloodType: 'A+', lastDonation: '7 months ago', isVerified: true },
  { id: 3, name: 'Rohan D.', avatar: 'user-avatar-2', distance: '4.8 km', bloodType: 'B+', lastDonation: '1 year ago', isVerified: false },
];

export default function SosRequestFlow({ onCancel }: { onCancel: () => void }) {
  const [status, setStatus] = useState('searching');
  const [foundDonors, setFoundDonors] = useState<Donor[]>([]);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-static');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('notifying');
      
      let donorCount = 0;
      const interval = setInterval(() => {
        if(donorCount < mockDonors.length) {
            setFoundDonors(prev => [...prev, mockDonors[donorCount]]);
            donorCount++;
        } else {
            clearInterval(interval);
            setStatus('finished');
        }
      }, 1500);

      return () => clearInterval(interval);

    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusMessage = () => {
    switch(status) {
        case 'searching': return 'Searching for donors in a 5km radius...';
        case 'notifying': return 'Found donors! Notifying them now...';
        case 'finished': return 'Alerts sent! Donors will respond shortly.';
        default: return '';
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-headline text-red-600 flex items-center gap-3">
                <Loader2 className="animate-spin" />
                SOS Request in Progress
              </CardTitle>
              <CardDescription>{getStatusMessage()}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-6 w-6"/>
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
               <Image src="https://images.unsplash.com/photo-1599947549338-23c3b1e42562?q=80&w=2544&auto=format&fit=crop" alt="Map" layout="fill" objectFit="cover" className="opacity-30" />
               <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-red-500/20 rounded-full animate-ping"></div>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-500/50 rounded-full animate-pulse"></div>
               </div>
               {foundDonors.map((donor, index) => {
                 const avatar = PlaceHolderImages.find(p => p.id === donor.avatar);
                 const positions = [ {top: '20%', left: '25%'}, {top: '60%', left: '70%'}, {top: '30%', left: '80%'}]
                 return (
                    <Avatar key={donor.id} className="absolute w-12 h-12 border-4 border-white shadow-lg" style={positions[index]}>
                        {avatar && <AvatarImage src={avatar.imageUrl} />}
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                 )
               })}
            </div>
            <div>
                <h3 className="text-xl font-headline mb-4">Matched Donors ({foundDonors.length}/{mockDonors.length})</h3>
                <div className="space-y-4">
                    {foundDonors.map(donor => {
                        const avatar = PlaceHolderImages.find(p => p.id === donor.avatar);
                        return (
                            <Card key={donor.id} className="flex items-center p-4 gap-4">
                                <Avatar className="h-12 w-12">
                                     {avatar && <AvatarImage src={avatar.imageUrl} />}
                                    <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <p className="font-bold text-lg flex items-center gap-2">
                                        {donor.name} ({donor.bloodType})
                                        {donor.isVerified && <ShieldCheck className="h-5 w-5 text-green-500" title="Verified Donor" />}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{donor.distance} away | Last donated: {donor.lastDonation}</p>
                                </div>
                                <Button variant="default" size="sm" onClick={() => setSelectedDonor(donor)}>
                                    <HeartPulse className="mr-2 h-4 w-4" /> Request
                                </Button>
                            </Card>
                        )
                    })}
                     {status !== 'finished' && foundDonors.length < mockDonors.length && (
                         <div className="text-center text-muted-foreground py-4">
                            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                            <p>Searching for more donors...</p>
                         </div>
                     )}
                     {status === 'finished' && (
                        <div className="text-center text-green-600 font-semibold py-4">
                            All donors have been notified.
                        </div>
                     )}
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!selectedDonor} onOpenChange={() => setSelectedDonor(null)}>
        <AlertDialogContent>
            {selectedDonor && (
                 <>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                           <AvatarImage src={PlaceHolderImages.find(p => p.id === selectedDonor.avatar)?.imageUrl} />
                           <AvatarFallback>{selectedDonor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        Request {selectedDonor.name}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You are about to send a direct request to this donor.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4 text-sm space-y-2">
                        <p><strong>Blood Type:</strong> {selectedDonor.bloodType}</p>
                        <p><strong>Distance:</strong> {selectedDonor.distance}</p>
                        <p><strong>Last Donation:</strong> {selectedDonor.lastDonation}</p>
                        <p><strong>Status:</strong> {selectedDonor.isVerified ? <span className="text-green-600 font-semibold">Verified</span> : 'Not Verified'}</p>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setSelectedDonor(null)}>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-primary hover:bg-primary/90" onClick={() => setSelectedDonor(null)}>
                        Send Direct Request
                      </AlertDialogAction>
                    </AlertDialogFooter>
                </>
            )}
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

