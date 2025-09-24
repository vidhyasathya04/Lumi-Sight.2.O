'use client';

import { Button } from '@/components/ui/button';
import StatCard from './StatCard';
import { Award, Calendar, Eye, Users } from 'lucide-react';
import EmergencyRequestCard from './EmergencyRequestCard';
import Link from 'next/link';

export default function DonorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">🩸 Blood Donor Hub - You're a Life Saver! ❤️</h1>
      
      <EmergencyRequestCard />

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Your Impact Dashboard</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Donations"
            value="4 times"
            icon="💝"
            footer="Last: 3mo"
            color="bg-primary"
          />
          <StatCard
            title="Lives Saved"
            value="12"
            icon={Award}
            footer="Top 5% Donor"
            color="bg-green-500"
          />
          <StatCard
            title="Next Eligible"
            value="in 25 days"
            icon={Calendar}
            footer="Health: Good ✅"
            color="bg-accent"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/eye-screening"><Eye className="w-8 h-8" /> Free Eye Screening</Link>
          </Button>
           <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/donate-blood"><Calendar className="w-8 h-8" /> Schedule Donation</Link>
          </Button>
          <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="#"><Calendar className="w-8 h-8" /> Find Blood Drives</Link>
          </Button>
           <Button variant="outline" size="lg" className="h-24 text-base flex-col gap-2" asChild>
            <Link href="/dashboard/community"><Users className="w-8 h-8" /> Donor Community</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
