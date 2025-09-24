import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Phone } from 'lucide-react';

export default function EmergencyRequestCard() {
  return (
    <Card className="border-red-500 bg-red-500/10">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl font-headline text-red-600 dark:text-red-400">
              <AlertTriangle className="h-6 w-6" />
              Emergency Request Nearby
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">O+ Blood Needed URGENTLY for a child patient.</CardDescription>
          </div>
          <div className="text-right">
             <div className="text-lg font-bold text-red-600 dark:text-red-400">Apollo Hospital</div>
             <div className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                <MapPin className="h-4 w-4"/> 2.3 km away
             </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 bg-background/50 p-4 rounded-lg">
          <p className="font-bold">Patient: 8-year-old child</p>
          <p>
            <span className="font-semibold">Context:</span> Child has diabetic ketoacidosis and needs immediate blood transfusion during surgery.
          </p>
          <p><span className="font-semibold">Urgency:</span> <span className="text-red-600 font-bold">CRITICAL</span> - Surgery in 3 hours</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-lg font-bold flex-1">
            🚑 Respond Now
          </Button>
          <Button size="lg" variant="outline" className="w-full text-lg flex-1">
            ❌ Can't Help Today
          </Button>
        </div>
        <div className="text-center mt-4">
            <Button variant="link" className="text-muted-foreground">
                <Phone className="mr-2 h-4 w-4" /> Call hospital: +91-80-XXXX-XXXX
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
