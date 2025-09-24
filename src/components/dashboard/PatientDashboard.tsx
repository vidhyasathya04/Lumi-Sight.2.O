'use client';

import { useUser } from '@/context/UserContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlarmClock, Eye, HandHeart, Hospital, MessageCircle, HeartPulse, ShieldCheck } from 'lucide-react';
import StatCard from './StatCard';
import Link from 'next/link';

export default function PatientDashboard() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <Alert className="bg-destructive/10 border-destructive/50 text-destructive-foreground dark:bg-destructive/20">
        <AlarmClock className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-destructive font-headline">Urgent Alert</AlertTitle>
        <AlertDescription className="flex items-center justify-between">
          <div>Your next eye screening is due in 5 days.</div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button size="sm" asChild className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Link href="/dashboard/eye-screening">Schedule Now</Link>
            </Button>
            <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">Remind Me Later</Button>
          </div>
        </AlertDescription>
      </Alert>

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Your Health Dashboard</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Eye Health"
            value="Good"
            icon={Eye}
            footer="Last: 6mo ago"
            color="bg-green-500"
          />
          <StatCard
            title="Blood Type"
            value={user?.bloodGroup || 'N/A'}
            icon={HeartPulse}
            footer={`Donor: ${user?.willingToDonateBlood || 'N/A'}`}
            color="bg-red-500"
          />
          <StatCard
            title="Health Score"
            value="850/1000"
            icon={ShieldCheck}
            footer="Health Champion"
            color="bg-amber-500"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/eye-screening"><Eye className="w-8 h-8" /> Start Eye Screening</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/donate-blood"><HandHeart className="w-8 h-8" /> Donate Blood</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/health-ai"><MessageCircle className="w-8 h-8" /> Ask Health AI</Link>
          </Button>
           <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="#"><Hospital className="w-8 h-8" /> Find Hospitals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
