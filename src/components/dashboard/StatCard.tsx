import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon | string;
  footer: string;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, footer, color }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {typeof Icon === 'string' ? (
          <span className="text-2xl">{Icon}</span>
        ) : (
          <div className={cn("p-2 rounded-full text-primary-foreground", color)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline">{value}</div>
      </CardContent>
       <CardFooter>
        <p className="text-xs text-muted-foreground">{footer}</p>
      </CardFooter>
    </Card>
  );
}
