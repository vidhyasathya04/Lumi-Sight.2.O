import EyeScreeningWorkflow from "@/components/eye-screening/EyeScreeningWorkflow";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function EyeScreeningPage() {
  return (
    <div className="container mx-auto py-8">
       <Card className="mb-8 bg-primary/10 border-primary/20">
        <CardHeader className="text-center items-center">
            <Eye className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="text-3xl font-headline text-primary">AI Eye Screening</CardTitle>
            <CardDescription>Detect early signs of diabetic retinopathy in minutes.</CardDescription>
        </CardHeader>
       </Card>

      <EyeScreeningWorkflow />
    </div>
  );
}
