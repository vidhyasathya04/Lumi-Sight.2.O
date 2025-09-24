'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Clock, HeartPulse, History, Loader2, MapPin, Mic, Phone, ShieldCheck, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HealthStatCard } from "@/components/blood-donation/HealthStatCard";

function EmergencyTab() {
    const emergencyRequests = [
        { name: "Aarav Sharma", bloodType: "O+", urgency: "CRITICAL", distance: "2.3 km", location: "Apollo Hospital", context: "Child patient, surgery in 3 hours" },
        { name: "Priya Singh", bloodType: "A-", urgency: "High", distance: "4.1 km", location: "Fortis Hospital", context: "Accident victim, immediate need" },
    ];
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Nearby Emergencies (5km radius)</h3>
            {emergencyRequests.map((req, index) => (
                <Card key={index} className="border-red-500 bg-red-500/10">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-xl font-headline text-red-600">
                                    <AlertTriangle className="h-5 w-5" />
                                    {req.bloodType} Needed URGENTLY
                                </CardTitle>
                                <CardDescription className="text-red-500">Patient: {req.name}</CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-red-600">{req.location}</div>
                                <div className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                                    <MapPin className="h-4 w-4" /> {req.distance} away
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">{req.context}</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 font-bold flex-1">
                                ✅ Accept & Navigate
                            </Button>
                            <Button size="lg" variant="outline" className="w-full flex-1">
                                ❌ Can't Help Today
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function ScheduledTab() {
    const appointments = [
        { date: "Tomorrow, 10:00 AM", patient: "Rohan Desai", location: "St. John's Hospital" },
        { date: "In 2 days, 02:30 PM", patient: "Sneha Gupta", location: "Patient's Residence" },
    ];
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Upcoming Appointments</h3>
            {appointments.map((appt, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center justify-between">
                            <span>Patient: {appt.patient}</span>
                            <span className="text-base font-medium text-muted-foreground">{appt.date}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" />{appt.location}</p>
                        <Button variant="outline" size="sm">View Details</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function HistoryTab() {
    const history = [
        { date: "3 months ago", location: "Victoria Hospital", patient: "Anonymous" },
        { date: "7 months ago", location: "Emergency Camp", patient: "Multiple" },
        { date: "1 year ago", location: "Fortis Hospital", patient: "Anonymous" },
    ];
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Donation Log</h3>
            {history.map((item, index) => (
                <Card key={index} className="bg-secondary/30">
                    <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <History className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-semibold">Donated at {item.location}</p>
                                <p className="text-sm text-muted-foreground">Patient: {item.patient}</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium">{item.date}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function HealthTab() {
    return (
        <div className="space-y-4">
             <h3 className="font-semibold text-lg">Your Health Vitals</h3>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HealthStatCard title="Blood Pressure" value="120/80" status="Normal" />
                <HealthStatCard title="Last Illness" value="None" status="Healthy" />
                <HealthStatCard title="Donation Status" value="Eligible" status="Ready" />
             </div>
             <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Eligibility Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> Age: 18-65 years</p>
                    <p className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> Weight: Above 50kg</p>
                    <p className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> Last Donation: More than 3 months ago</p>
                </CardContent>
             </Card>
        </div>
    )
}

function AiAssistantTab() {
    return (
        <div className="text-center py-10">
            <Mic className="h-16 w-16 mx-auto text-primary animate-pulse"/>
            <h3 className="mt-4 text-xl font-semibold">AI Voice Assistant</h3>
            <p className="text-muted-foreground mt-2">Ask me anything about donation eligibility!</p>
            <p className="text-sm text-muted-foreground mt-4 italic">"Can I donate today?" <br/> "I have a fever, can I donate?"</p>
            <Button className="mt-6">Tap to Speak</Button>
        </div>
    )
}


export default function DonorDashboardPage() {
    const { user } = useUser();
    return (
        <div className="container mx-auto py-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
                        <HeartPulse /> Donor Dashboard
                    </h1>
                    <p className="text-muted-foreground">Thank you for being a life-saver!</p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 border-2 border-primary/50">
                            <User className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><User className="mr-2 h-4 w-4"/> Full Profile</DropdownMenuItem>
                        <DropdownMenuItem><History className="mr-2 h-4 w-4"/> Donation History</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <Tabs defaultValue="emergency" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="emergency">Emergency</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="health">Health</TabsTrigger>
                    <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                </TabsList>
                <TabsContent value="emergency" className="mt-6">
                    <EmergencyTab />
                </TabsContent>
                <TabsContent value="scheduled" className="mt-6">
                    <ScheduledTab />
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                    <HistoryTab />
                </TabsContent>
                 <TabsContent value="health" className="mt-6">
                    <HealthTab />
                </TabsContent>
                 <TabsContent value="ai" className="mt-6">
                    <AiAssistantTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
