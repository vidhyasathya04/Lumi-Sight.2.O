import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthStatCardProps {
    title: string;
    value: string;
    status: string;
}

export function HealthStatCard({ title, value, status }: HealthStatCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <Badge variant={status === 'Normal' || status === 'Healthy' || status === 'Ready' ? 'default' : 'secondary'} className="mt-1">{status}</Badge>
            </CardContent>
        </Card>
    );
}
