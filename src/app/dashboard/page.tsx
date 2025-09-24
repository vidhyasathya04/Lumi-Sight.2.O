'use client';

import PatientDashboard from '@/components/dashboard/PatientDashboard';
import DonorDashboard from '@/components/dashboard/DonorDashboard';
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  // Prioritize Patient dashboard if user is both
  if (user.hasDiabetes === 'Yes' || user.userType === 'Patient') {
    return <PatientDashboard />;
  }

  if (user.willingToDonateBlood === 'Yes' || user.userType === 'Blood Donor') {
    return <DonorDashboard />;
  }

  // Default to patient dashboard
  return <PatientDashboard />;
}
